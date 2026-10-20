import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import type { NextRequest } from "next/server";
import { CONTENT_TAG } from "@/lib/content";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
    if (!isValidSignature) {
      return Response.json({ message: "Invalid signature" }, { status: 401 });
    }
    revalidateTag(CONTENT_TAG, { expire: 0 });
    return Response.json({ revalidated: true, type: body?._type ?? null });
  } catch (err) {
    return Response.json({ message: (err as Error).message }, { status: 500 });
  }
}
