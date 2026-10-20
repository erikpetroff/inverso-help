import { notFound } from "next/navigation";

// Unknown URLs (and unknown article/collection slugs, via proxy.ts) render the localized not-found page with a 404 status.
export default function CatchAll() {
  notFound();
}
