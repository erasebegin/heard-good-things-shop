import { NextRequest, NextResponse } from "next/server";
import PocketBase from "pocketbase";
import jwt from "jsonwebtoken";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const client = new PocketBase(process.env.PB_URL);
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY as string,
  });

  const sentFrom = new Sender("shop@heardgoodthings.com", "HGT Team");
  const recipients = [new Recipient(email, "Dear Customer")];

  const token = jwt.sign({ email: email }, process.env.JWT_TOKEN as string, {
    algorithm: "HS256",
  });

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Thank you for your purchase!")
    .setHtml(
      `<strong>This is the HTML content. This is the download link <a href="https://shop.heardgoodthings.com/download/${token}">https://shop.heardgoodthings.com/download/${token}</a></strong>`,
    )
    .setText("This is the text content. What does this do?");

  try {
    await mailerSend.email.send(emailParams);
  } catch (err: any) {
    console.error({ mailerSend: err });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  try {
    await client.admins.authWithPassword(
      process.env.PB_ADMIN_EMAIL,
      process.env.PB_ADMIN_PASSWORD,
    );

    const records = await client.collection("download_tokens").create({
      email,
      token,
    });

    return NextResponse.json({ records });
  } catch (err: any) {
    console.error({ databaseError: err });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
