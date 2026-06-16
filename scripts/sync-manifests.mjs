// Sync each app repo's manifest + legal into content/apps/<slug>/.
// Usage: node scripts/sync-manifests.mjs ../tally ../ladle
// In CI, list the app repos (or check them out) and run this before `next build`.
import fs from "node:fs";
import path from "node:path";

const dest = path.join(process.cwd(), "content", "apps");

for (const repo of process.argv.slice(2)) {
  const manifest = path.join(repo, "surge.manifest.yaml");
  if (!fs.existsSync(manifest)) {
    console.warn("skip (no manifest):", repo);
    continue;
  }
  const raw = fs.readFileSync(manifest, "utf8");
  const slug = (/^\s*slug:\s*(\S+)/m.exec(raw)?.[1] ?? path.basename(repo)).trim();
  const out = path.join(dest, slug);
  fs.mkdirSync(path.join(out, "legal"), { recursive: true });
  fs.copyFileSync(manifest, path.join(out, "surge.manifest.yaml"));
  for (const kind of ["privacy", "terms"]) {
    const src = path.join(repo, "legal", `${kind}.md`);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(out, "legal", `${kind}.md`));
  }
  const shots = path.join(repo, "marketing", "shots");
  if (fs.existsSync(shots)) {
    const shotsOut = path.join(out, "shots");
    fs.mkdirSync(shotsOut, { recursive: true });
    for (const f of fs.readdirSync(shots))
      fs.copyFileSync(path.join(shots, f), path.join(shotsOut, f));
  }
  console.log("synced:", slug);
}
