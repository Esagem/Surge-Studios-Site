# Per-app legal content

Surge Studios LLC owns and operates every app under its umbrella. The master
Privacy Policy (`/privacy`) and Terms of Service (`/terms`) apply to all of them;
each app publishes a short notice that **supplements** the master and is hosted
here at `/<slug>/privacy` and `/<slug>/terms` (what a manifest's `privacy_url` /
`terms_url` point to).

## Add a new project

1. Generate the app's legal from its manifest (in the Daedalus repo):

   ```
   cd Daedalus/tools/legal_gen
   dart run bin/legal_gen.dart <path>/surge.manifest.yaml <out>
   ```

2. Copy the generated `legal.json` here as `<slug>.json`
   (e.g. `ladle.json`). Do **not** hand-edit it — regenerate from the manifest.

3. Rebuild the registry:

   ```
   npm run build:legal
   ```

That regenerates `index.ts`, so the app's `/<slug>/privacy` + `/<slug>/terms`
pages are created and it's listed as a covered product on the master policy and
terms. `index.ts` is generated — never edit it by hand.
