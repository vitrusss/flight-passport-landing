import { readFileSync } from "fs";
import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGE = resolve(__dirname, "../app/page.tsx");
const OUT  = resolve(__dirname, "../public/images");

const src  = readFileSync(PAGE, "utf8");
const urls = [...new Set(
  [...src.matchAll(/https:\/\/www\.figma\.com\/api\/mcp\/asset\/([a-z0-9-]+)/g)]
    .map(m => ({ url: m[0], id: m[1] }))
)];

console.log(`Found ${urls.length} unique Figma asset URLs\n`);

let ok = 0, skip = 0, fail = 0;

for (const { url, id } of urls) {
  const dest = path.join(OUT, `asset-${id}.png`);
  if (existsSync(dest)) {
    console.log(`SKIP  asset-${id}.png (already exists)`);
    skip++;
    continue;
  }
  try {
    execSync(`curl -s -L --max-time 15 "${url}" -o "${dest}"`, { stdio: "inherit" });
    // Verify it's a real image (not an error HTML page)
    const size = parseInt(execSync(`wc -c < "${dest}"`).toString().trim(), 10);
    if (size < 100) {
      execSync(`rm "${dest}"`);
      console.log(`FAIL  asset-${id}.png (response too small: ${size} bytes)`);
      fail++;
    } else {
      console.log(`OK    asset-${id}.png (${size} bytes)`);
      ok++;
    }
  } catch (e) {
    console.log(`ERROR asset-${id}.png: ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} downloaded, ${skip} skipped, ${fail} failed`);
