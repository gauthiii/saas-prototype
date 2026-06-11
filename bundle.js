// bundle.js
// Native Node.js zip bundler — uses only `fs`, `path`, and `zlib`.
// Run `node bundle.js` to produce app-prototype.zip (excludes node_modules, dist, .git, and the zip itself).

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, "app-prototype.zip");
const EXCLUDE = new Set(["node_modules", "dist", ".git", "app-prototype.zip"]);

// ---- CRC32 (standard zip polynomial) ----
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// ---- Walk the project tree ----
function walk(dir, base = "") {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    if (EXCLUDE.has(name)) continue;
    const full = path.join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    const st = fs.statSync(full);
    if (st.isDirectory()) out.push(...walk(full, rel));
    else out.push({ full, rel });
  }
  return out;
}

// ---- Build the zip (local headers + central directory, DEFLATE method 8) ----
const u16 = v => { const b = Buffer.alloc(2); b.writeUInt16LE(v); return b; };
const u32 = v => { const b = Buffer.alloc(4); b.writeUInt32LE(v >>> 0); return b; };

function dosDateTime(d = new Date()) {
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
  const date = (((d.getFullYear() - 1980) & 0x7f) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  return { time, date };
}

const files = walk(ROOT);
const { time, date } = dosDateTime();
const localParts = [];
const centralParts = [];
let offset = 0;

for (const f of files) {
  const data = fs.readFileSync(f.full);
  const name = Buffer.from(f.rel.replace(/\\/g, "/"), "utf8");
  const crc = crc32(data);
  const deflated = zlib.deflateRawSync(data, { level: 9 });
  const useDeflate = deflated.length < data.length;
  const payload = useDeflate ? deflated : data;
  const method = useDeflate ? 8 : 0;

  const local = Buffer.concat([
    u32(0x04034b50), u16(20), u16(0x0800), u16(method),
    u16(time), u16(date), u32(crc), u32(payload.length), u32(data.length),
    u16(name.length), u16(0), name, payload,
  ]);
  localParts.push(local);

  const central = Buffer.concat([
    u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(method),
    u16(time), u16(date), u32(crc), u32(payload.length), u32(data.length),
    u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), name,
  ]);
  centralParts.push(central);
  offset += local.length;
}

const centralDir = Buffer.concat(centralParts);
const eocd = Buffer.concat([
  u32(0x06054b50), u16(0), u16(0),
  u16(files.length), u16(files.length),
  u32(centralDir.length), u32(offset), u16(0),
]);

fs.writeFileSync(OUT, Buffer.concat([...localParts, centralDir, eocd]));
console.log(`✔ app-prototype.zip written — ${files.length} files, ${(fs.statSync(OUT).size / 1024).toFixed(1)} KiB`);
