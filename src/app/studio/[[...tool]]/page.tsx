import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import type { Metadata, Viewport } from "next";
import { isSanityConfigured } from "@/sanity/env";
import { Studio } from "./studio";

export const metadata: Metadata = { ...studioMetadata, title: "Studio | Inverso Help Center" };
export const viewport: Viewport = studioViewport;

export default function StudioPage() {
  if (!isSanityConfigured) return <StudioSetup />;
  return <Studio />;
}

const code = "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]";

function StudioSetup() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-20">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">Sanity Studio</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Connect a Sanity project</h1>
      <p className="mt-4 text-muted-foreground">
        The site is currently serving the bundled content from <code className={code}>content/seed.json</code> (Bulgarian
        and English). To edit articles in Sanity Studio, add these variables to <code className={code}>.env.local</code>{" "}
        and to your Vercel project:
      </p>
      <pre className="mt-6 overflow-x-auto rounded-xl bg-zinc-950 p-5 text-sm leading-6 text-zinc-100">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=...      # only for npm run seed
SANITY_REVALIDATE_SECRET=...    # for the /api/revalidate webhook`}
      </pre>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          Create a project at{" "}
          <a className="text-primary underline" href="https://www.sanity.io/manage">
            sanity.io/manage
          </a>
          .
        </li>
        <li>
          Under <em>API → CORS origins</em>, add <code className={code}>http://localhost:4317</code> and your Vercel URL with
          “Allow credentials”.
        </li>
        <li>
          Import the existing articles in both languages with <code className={code}>npm run seed</code>.
        </li>
        <li>Restart the dev server and open /studio again.</li>
      </ol>
    </main>
  );
}
