/* eslint-disable @typescript-eslint/no-explicit-any */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();

  const svixId = headersList.get("svix-id");
  const svixTimeStamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");

  if (!svixId || !svixTimeStamp || !svixSignature) {
    return new Response("Bad request", { status: 400 });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let event: { type: string; data: any };

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimeStamp,
      "svix-signature": svixSignature,
    }) as { type: string; data: any };
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "user.created") {
    await prisma.user.create({
      data: {
        clerkId: event.data.id,
        username: event.data.username ?? event.data.id,
        avatarUrl: event.data.image_url,
      },
    });
  }

  return new Response("OK", { status: 200 });
}
