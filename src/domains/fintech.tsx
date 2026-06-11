// src/domains/fintech.tsx
import { useState } from "react";
import { Wallet, ArrowDownLeft, ArrowUpRight, FileText, CheckCircle2, CreditCard, Send, Snowflake, ThumbsUp, ThumbsDown, PiggyBank } from "lucide-react";
import { Card, SectionTitle, Badge, Stat, Drawer, Skeleton, useFakeSubmit, Toggle, Tone } from "../components/ui";
import { AreaChart, Bars, Donut, Sparkline } from "../components/charts";
import { AIPanel, Insight } from "../components/AIPanel";

type Txn = { id: string; party: string; date: string; amount: number; status: "Settled" | "Pending" | "Failed"; method: string };

const txns: Txn[] = [
  { id: "TX-90412", party: "Northwind Traders", date: "Jun 11, 09:14", amount: 12450, status: "Settled", method: "ACH transfer" },
  { id: "TX-90411", party: "Acme Cloud Services", date: "Jun 11, 08:02", amount: -1890, status: "Settled", method: "Corporate card" },
  { id: "TX-90409", party: "Lumen Logistics", date: "Jun 10, 17:46", amount: 6200, status: "Pending", method: "Wire transfer" },
  { id: "TX-90405", party: "Payroll · June cycle 1", date: "Jun 10, 09:00", amount: -48200, status: "Settled", method: "Bulk ACH" },
  { id: "TX-90398", party: "Helio Energy Co.", date: "Jun 9, 14:21", amount: 3300, status: "Failed", method: "Direct debit" },
];

const statusTone: Record<Txn["status"], Tone> = { Settled: "green", Pending: "amber", Failed: "red" };

const insights: Insight[] = [
  { title: "Cash runway extended", body: "Receivables collected 6 days faster this cycle. Projected runway moves from 14.2 to 15.8 months at current burn.", tone: "green", tag: "Forecast", confidence: 92 },
  { title: "Duplicate vendor charge", body: "Acme Cloud Services billed twice within 31 days for matching amounts. Recommend dispute before the statement closes.", tone: "amber", tag: "Anomaly", confidence: 87 },
  { title: "FX exposure rising", body: "EUR-denominated invoices now 22% of receivables. A 30-day forward contract would hedge ~80% of the exposure.", tone: "blue", tag: "Hedging", confidence: 74 },
];

function money(n: number) {
  return (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString();
}

export function FintechDashboard() {
  const [selected, setSelected] = useState<Txn | null>(null);
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2 space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Operating balance" value="$842,310" delta="+4.1% this week" icon={<Wallet size={16} />} />
          <Stat label="Inflows · 30d" value="$214,900" delta="+12.6%" icon={<ArrowDownLeft size={16} />} />
          <Stat label="Outflows · 30d" value="$163,420" delta="+2.2%" deltaTone="amber" icon={<ArrowUpRight size={16} />} />
        </div>
        <Card>
          <SectionTitle eyebrow="Treasury" title="Cash flow, trailing 12 weeks" right={<Badge tone="blue">Live</Badge>} />
          <AreaChart data={[62, 58, 66, 71, 64, 78, 82, 76, 88, 84, 95, 102]} />
        </Card>
        <Card>
          <SectionTitle eyebrow="Ledger" title="Recent transactions" right={<span className="text-xs ink-2">{txns.length} of 1,204</span>} />
          <div className="divide-y divide-[var(--line)]">
            {txns.map(t => (
              <button key={t.id} onClick={() => setSelected(t)}
                className="w-full grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_120px_110px_90px] items-center gap-3 py-3 text-left hover:bg-accent/5 rounded-lg px-2 -mx-2 transition-colors">
                <div>
                  <div className="text-sm font-medium">{t.party}</div>
                  <div className="text-xs ink-2 font-mono">{t.id}</div>
                </div>
                <div className="text-xs ink-2 hidden sm:block">{t.date}</div>
                <div className={`text-sm font-semibold font-mono text-right ${t.amount > 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>{money(t.amount)}</div>
                <div className="text-right"><Badge tone={statusTone[t.status]}>{t.status}</Badge></div>
              </button>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card className="bg-gradient-to-br from-accent to-violet-600 text-white border-0 card-hover">
          <div className="flex items-center justify-between">
            <CreditCard size={20} className="opacity-80" />
            <span className="text-xs font-mono opacity-80">VIRTUAL · 4421</span>
          </div>
          <div className="mt-6 font-mono tracking-[.2em] text-lg">•••• •••• •••• 4421</div>
          <div className="mt-4 flex justify-between text-xs opacity-90">
            <span>Ops · Engineering</span><span>Limit $25,000 / mo</span>
          </div>
        </Card>
        <AIPanel context="Treasury & ledger, last 30 days" insights={insights} />
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Transaction detail">
        {selected && (
          <div className="space-y-4">
            <div className={`font-display text-3xl font-bold ${selected.amount > 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>{money(selected.amount)}</div>
            <Badge tone={statusTone[selected.status]} pulse={selected.status === "Pending"}>{selected.status}</Badge>
            <dl className="space-y-3 text-sm">
              {[["Counterparty", selected.party], ["Reference", selected.id], ["Date", selected.date], ["Method", selected.method], ["Account", "Operating · ••6610"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[var(--line)] pb-2">
                  <dt className="ink-2">{k}</dt><dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <button className="btn-primary w-full justify-center">Download receipt</button>
          </div>
        )}
      </Drawer>
    </div>
  );
}

export function InvoiceForm() {
  const [step, setStep] = useState(0);
  const { state, submit, reset } = useFakeSubmit();
  const steps = ["Client", "Line items", "Review & send"];
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <SectionTitle eyebrow="Billing" title="New invoice" />
        <ol className="flex items-center gap-2 mb-6">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2 flex-1">
              <span className={`grid place-items-center h-6 w-6 rounded-full text-[11px] font-bold transition-colors ${i <= step ? "bg-accent text-white" : "surface ink-2"}`}>{i + 1}</span>
              <span className={`text-xs font-medium ${i === step ? "" : "ink-2"}`}>{s}</span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-[var(--line)]" />}
            </li>
          ))}
        </ol>

        {state === "loading" ? (
          <div className="space-y-3 py-2"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-24" /></div>
        ) : state === "done" ? (
          <div className="text-center py-10 animate-fadeUp">
            <CheckCircle2 className="mx-auto text-emerald-500" size={40} />
            <div className="font-display font-semibold mt-3">Invoice INV-2041 sent</div>
            <p className="text-sm ink-2 mt-1">Northwind Traders will receive a payment link by email.</p>
            <button className="btn-ghost mt-5" onClick={() => { reset(); setStep(0); }}>Create another</button>
          </div>
        ) : (
          <>
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2 animate-fadeUp">
                <div className="sm:col-span-2"><label className="label">Client</label><input className="field" defaultValue="Northwind Traders" /></div>
                <div><label className="label">Billing email</label><input className="field" type="email" defaultValue="ap@northwind.example" /></div>
                <div><label className="label">Currency</label><select className="field"><option>USD</option><option>EUR</option><option>INR</option></select></div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-3 animate-fadeUp">
                {["Solution architecture · 32 hrs", "Governance workshop · fixed fee"].map((li, i) => (
                  <div key={li} className="grid grid-cols-[1fr_110px] gap-3">
                    <input className="field" defaultValue={li} />
                    <input className="field font-mono" defaultValue={i === 0 ? "$6,400" : "$2,500"} />
                  </div>
                ))}
                <button className="btn-ghost text-xs">+ Add line item</button>
              </div>
            )}
            {step === 2 && (
              <div className="animate-fadeUp rounded-lg border border-[var(--line)] p-4 text-sm space-y-2">
                <div className="flex justify-between"><span className="ink-2">Subtotal</span><span className="font-mono">$8,900.00</span></div>
                <div className="flex justify-between"><span className="ink-2">Tax (8%)</span><span className="font-mono">$712.00</span></div>
                <div className="flex justify-between font-semibold border-t border-[var(--line)] pt-2"><span>Total due · Net 30</span><span className="font-mono">$9,612.00</span></div>
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <button className="btn-ghost" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Back</button>
              {step < 2
                ? <button className="btn-primary" onClick={() => setStep(s => s + 1)}>Continue</button>
                : <button className="btn-primary" onClick={submit}><FileText size={15} /> Send invoice</button>}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export function FintechAnalytics() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card>
        <SectionTitle eyebrow="Analytics" title="Revenue by month" />
        <Bars data={[{label:"Jan",value:64},{label:"Feb",value:71},{label:"Mar",value:58},{label:"Apr",value:83},{label:"May",value:91},{label:"Jun",value:76}]} height={180} />
      </Card>
      <Card>
        <SectionTitle eyebrow="Analytics" title="Collections efficiency" />
        <AreaChart data={[71, 74, 73, 79, 82, 80, 86, 89]} stroke="#10b981" height={180} />
        <p className="text-sm ink-2 mt-3">Days sales outstanding improved from 41 to 33 over the last two quarters.</p>
      </Card>
    </div>
  );
}

const payees = [
  { name: "Northwind Traders", detail: "ACH · ••2241", last: "$12,450" },
  { name: "Lumen Logistics", detail: "Wire · ••8810", last: "$6,200" },
  { name: "Helio Energy Co.", detail: "Direct debit · ••3375", last: "$3,300" },
  { name: "Acme Cloud Services", detail: "Card · ••4421", last: "$1,890" },
];

export function PaymentsScreen() {
  const [payee, setPayee] = useState(payees[0].name);
  const { state, submit, reset } = useFakeSubmit();
  return (
    <div className="grid gap-5 lg:grid-cols-5 max-w-5xl mx-auto">
      <Card className="lg:col-span-3">
        <SectionTitle eyebrow="Payments" title="Send a payment" right={<Send size={15} className="text-accent" />} />
        {state === "done" ? (
          <div className="text-center py-10 animate-fadeUp">
            <CheckCircle2 className="mx-auto text-emerald-500" size={40} />
            <div className="font-display font-semibold mt-3">Payment scheduled</div>
            <p className="text-sm ink-2 mt-1">{payee} will receive funds within 1 business day. Reference PAY-7731.</p>
            <button className="btn-ghost mt-5" onClick={reset}>Send another</button>
          </div>
        ) : state === "loading" ? (
          <div className="space-y-3 py-2"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 animate-fadeUp">
            <div className="sm:col-span-2"><label className="label">Payee</label>
              <select className="field" value={payee} onChange={e => setPayee(e.target.value)}>
                {payees.map(p => <option key={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div><label className="label">Amount</label><input className="field font-mono" defaultValue="$4,800.00" /></div>
            <div><label className="label">From account</label><select className="field"><option>Operating · ••6610</option><option>Reserve · ••2208</option></select></div>
            <div><label className="label">Send on</label><input className="field" type="date" defaultValue="2026-06-12" /></div>
            <div><label className="label">Rail</label><select className="field"><option>ACH (free, 1 day)</option><option>Wire ($15, same day)</option><option>RTP (instant)</option></select></div>
            <div className="sm:col-span-2"><label className="label">Memo</label><input className="field" placeholder="Visible to the payee" defaultValue="June freight settlement" /></div>
            <div className="sm:col-span-2 flex justify-end"><button className="btn-primary" onClick={submit}><Send size={15} /> Review & send</button></div>
          </div>
        )}
      </Card>
      <Card className="lg:col-span-2">
        <SectionTitle eyebrow="Saved" title="Recent payees" />
        <div className="space-y-2">
          {payees.map(p => (
            <button key={p.name} onClick={() => setPayee(p.name)}
              className={`w-full flex items-center justify-between rounded-lg border p-3 text-left transition-colors ${payee === p.name ? "border-accent/60 bg-accent/5" : "border-[var(--line)] hover:border-accent/40"}`}>
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs ink-2">{p.detail}</div>
              </div>
              <span className="text-xs font-mono ink-2">{p.last}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/8 p-3 text-xs leading-relaxed">
          <span className="font-semibold">Dual approval on.</span> Payments over $10,000 require a second approver before release.
        </div>
      </Card>
    </div>
  );
}

const cardsData = [
  { id: "4421", holder: "Ops · Engineering", limit: 25000, spent: 14210, trend: [8, 9, 12, 11, 14, 14.2] },
  { id: "8137", holder: "Marketing · Events", limit: 12000, spent: 11460, trend: [4, 6, 7, 9, 11, 11.5] },
  { id: "2906", holder: "Travel · Exec", limit: 8000, spent: 2380, trend: [3, 2, 4, 3, 2, 2.4] },
];

export function CardsScreen() {
  const [frozen, setFrozen] = useState<Record<string, boolean>>({});
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <SectionTitle eyebrow="Spend management" title="Corporate cards" right={<Badge tone="blue">3 active</Badge>} />
      <div className="grid gap-4">
        {cardsData.map(c => {
          const pct = Math.round((c.spent / c.limit) * 100);
          const isFrozen = !!frozen[c.id];
          return (
            <Card key={c.id} className={`card-hover transition-opacity ${isFrozen ? "opacity-60" : ""}`}>
              <div className="flex flex-wrap items-center gap-4">
                <div className={`h-12 w-[76px] rounded-lg grid place-items-center text-white shrink-0 ${isFrozen ? "bg-zinc-500" : "bg-gradient-to-br from-accent to-violet-600"}`}>
                  <CreditCard size={18} />
                </div>
                <div className="flex-1 min-w-40">
                  <div className="text-sm font-semibold">{c.holder}</div>
                  <div className="text-xs ink-2 font-mono">VIRTUAL · •••• {c.id}</div>
                </div>
                <Sparkline data={c.trend} color={pct > 90 ? "#f43f5e" : "#4f6df5"} />
                <div className="text-right">
                  <div className="text-sm font-mono font-semibold">{money(c.spent)} <span className="ink-2 font-normal">/ {money(c.limit)}</span></div>
                  <div className="text-[11px] ink-2">{pct}% of monthly limit</div>
                </div>
                <div className="flex items-center gap-2">
                  <Snowflake size={14} className={isFrozen ? "text-sky-500" : "ink-2"} />
                  <Toggle on={isFrozen} onChange={v => setFrozen(f => ({ ...f, [c.id]: v }))} label={`Freeze card ${c.id}`} />
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${pct > 90 ? "bg-rose-500" : pct > 70 ? "bg-amber-500" : "bg-accent"}`} style={{ width: `${pct}%` }} />
              </div>
              {isFrozen && <div className="mt-2 text-xs text-sky-600 dark:text-sky-400 font-medium animate-fadeUp">Card frozen — all new authorizations will decline.</div>}
            </Card>
          );
        })}
      </div>
      <Card>
        <SectionTitle eyebrow="Controls" title="Card policies" />
        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          {[["Merchant categories", "SaaS, travel, fuel allowed"], ["Per-transaction cap", "$5,000 default"], ["Receipt capture", "Required over $75"]].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-[var(--line)] p-3.5">
              <div className="font-medium">{k}</div>
              <div className="text-xs ink-2 mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

type Expense = { id: string; who: string; desc: string; amount: number; category: string };
const expensesSeed: Expense[] = [
  { id: "EXP-2210", who: "R. Mehta", desc: "Client dinner — Northwind kickoff", amount: 284, category: "Meals" },
  { id: "EXP-2209", who: "T. Walsh", desc: "Conference pass · DevWorld 2026", amount: 1150, category: "Events" },
  { id: "EXP-2207", who: "K. Subramanian", desc: "Monitor + dock for new hire", amount: 612, category: "Equipment" },
  { id: "EXP-2204", who: "L. Ortiz", desc: "Rideshare, airport transfers", amount: 96, category: "Travel" },
];

export function ExpenseApprovals() {
  const [decided, setDecided] = useState<Record<string, "approved" | "rejected">>({});
  const pending = expensesSeed.filter(e => !decided[e.id]).length;
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Awaiting approval" value={String(pending)} delta={pending > 0 ? "Action needed" : "All clear"} deltaTone={pending > 0 ? "amber" : "green"} />
        <Stat label="Approved · MTD" value="$18,420" delta="+6.3% vs May" />
        <Stat label="Avg. decision time" value="4.1 hrs" delta="−38% with auto-rules" />
      </div>
      <Card>
        <SectionTitle eyebrow="Expenses" title="Approval queue" right={<span className="text-xs ink-2">Policy: auto-approve under $50</span>} />
        <div className="space-y-3">
          {expensesSeed.map(e => {
            const verdict = decided[e.id];
            return (
              <div key={e.id} className={`rounded-lg border p-4 transition-all duration-300 ${verdict === "approved" ? "border-emerald-500/40 bg-emerald-500/5" : verdict === "rejected" ? "border-rose-500/40 bg-rose-500/5 opacity-70" : "border-[var(--line)]"}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-44">
                    <div className="text-sm font-medium">{e.desc}</div>
                    <div className="text-xs ink-2 mt-0.5">{e.who} · <span className="font-mono">{e.id}</span> · {e.category}</div>
                  </div>
                  <div className="font-mono font-semibold">{money(e.amount)}</div>
                  {verdict ? (
                    <Badge tone={verdict === "approved" ? "green" : "red"}>{verdict === "approved" ? "Approved" : "Rejected"}</Badge>
                  ) : (
                    <div className="flex gap-2">
                      <button className="btn-ghost !py-1.5 text-xs" onClick={() => setDecided(d => ({ ...d, [e.id]: "rejected" }))}><ThumbsDown size={13} /> Reject</button>
                      <button className="btn-primary !py-1.5 text-xs" onClick={() => setDecided(d => ({ ...d, [e.id]: "approved" }))}><ThumbsUp size={13} /> Approve</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

const budgets = [
  { name: "Engineering", spent: 64200, cap: 80000, color: "#4f6df5" },
  { name: "Marketing", spent: 31800, cap: 35000, color: "#8b5cf6" },
  { name: "Operations", spent: 18900, cap: 30000, color: "#10b981" },
  { name: "People & culture", spent: 9400, cap: 15000, color: "#f59e0b" },
];

export function BudgetsScreen() {
  return (
    <div className="grid gap-5 lg:grid-cols-3 max-w-5xl mx-auto">
      <Card className="lg:col-span-1">
        <SectionTitle eyebrow="FY26 · Q2" title="Allocation" right={<PiggyBank size={15} className="text-accent" />} />
        <div className="grid place-items-center py-2">
          <Donut segments={budgets.map(b => ({ name: b.name, value: b.cap, color: b.color }))} label="$160k" sublabel="quarterly cap" size={170} />
        </div>
        <div className="mt-3 space-y-1.5">
          {budgets.map(b => (
            <div key={b.name} className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full" style={{ background: b.color }} />
              <span className="flex-1">{b.name}</span>
              <span className="font-mono ink-2">{money(b.cap)}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="lg:col-span-2 space-y-5">
        <Card>
          <SectionTitle eyebrow="Budgets" title="Spend vs. budget by team" right={<Badge tone="amber">1 near limit</Badge>} />
          <div className="space-y-4">
            {budgets.map(b => {
              const pct = Math.round((b.spent / b.cap) * 100);
              return (
                <div key={b.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{b.name}</span>
                    <span className="font-mono text-xs ink-2">{money(b.spent)} / {money(b.cap)} · <span className={pct > 85 ? "text-amber-600 dark:text-amber-400 font-semibold" : ""}>{pct}%</span></span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: pct > 85 ? "#f59e0b" : b.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <SectionTitle eyebrow="Forecast" title="Projected quarter-end position" />
          <AreaChart data={[160, 152, 147, 139, 128, 121, 112, 101, 94, 88]} stroke="#8b5cf6" height={120} />
          <p className="text-sm ink-2 mt-3">At the current run rate the company ends Q2 with <span className="font-semibold text-[var(--ink)]">$35.8k unspent</span> — Marketing is pacing 8% hot and will need a transfer or a cap raise by July.</p>
        </Card>
      </div>
    </div>
  );
}
