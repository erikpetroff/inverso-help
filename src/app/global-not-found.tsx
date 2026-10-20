import type { Metadata } from "next";
import Link from "next/link";
import { inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | Inverso Help Center",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="bg" className={`${inter.variable} h-full antialiased`}>
      <body className="grid min-h-full place-items-center bg-header px-6 text-center text-white">
        <main>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/inverso-logo-white.svg" alt="Inverso" width={137} height={32} className="mx-auto h-8 w-auto" />
          <h1 className="mt-8 text-2xl font-semibold">Хм. Тази страница не съществува.</h1>
          <p className="mt-2 text-white/70">Hmm. This page doesn&apos;t exist.</p>
          <div className="mt-8 flex justify-center gap-3 text-sm font-medium">
            <Link href="/" className="rounded-lg bg-white px-4 py-2 text-black">Помощен център</Link>
            <Link href="/en" className="rounded-lg border border-white/20 px-4 py-2">Help Center</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
