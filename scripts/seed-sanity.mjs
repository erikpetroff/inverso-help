#!/usr/bin/env node
// Imports content/seed.json (scraped from help.inverso.bg) into a Sanity dataset.
// Usage: npm run seed            -> creates missing documents, keeps existing edits
//        npm run seed -- --force -> overwrites documents with the seed content
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const force = process.argv.includes("--force");
const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, SANITY_API_WRITE_TOKEN: token } = process.env;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (e.g. in .env.local) first.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-10-01", useCdn: false });
const docs = JSON.parse(await readFile(path.join(root, "content/seed.json"), "utf8"));

async function upload(file) {
  const asset = await client.assets.upload("image", createReadStream(path.join(root, file)), {
    filename: path.basename(file),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const avatar = await upload("public/brand/avatar.svg");
const logo = await upload("public/brand/inverso-logo-white.svg");
for (const doc of docs) {
  if (doc._type === "author" && !doc.avatar) doc.avatar = avatar;
  if (doc._type === "siteSettings" && !doc.logo) doc.logo = logo;
}

const BATCH = 25;
for (let i = 0; i < docs.length; i += BATCH) {
  const tx = client.transaction();
  for (const doc of docs.slice(i, i + BATCH)) {
    if (force) tx.createOrReplace(doc);
    else tx.createIfNotExists(doc);
  }
  await tx.commit({ visibility: "async" });
  console.log(`  ${Math.min(i + BATCH, docs.length)}/${docs.length} documents`);
}

console.log(`Seeded ${docs.length} documents into ${projectId}/${dataset}${force ? " (overwritten)" : ""}.`);
