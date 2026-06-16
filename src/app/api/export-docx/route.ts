import { NextRequest } from "next/server";
import { execFile } from "child_process";
import { readFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const form = await req.json();
  const outPath = join(tmpdir(), `filled-${randomUUID()}.docx`);
  const scriptPath = join(process.cwd(), "scripts", "fill_template.py");
  const templatePath = join(process.cwd(), "public", "template.docx");

  await new Promise<void>((resolve, reject) => {
    execFile("python3", [scriptPath, templatePath, outPath, JSON.stringify(form)], { timeout: 15000 }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  const buffer = await readFile(outPath);
  unlink(outPath).catch(() => {});

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="Phieu-dat-cho-Coastal-QN.docx"',
    },
  });
}
