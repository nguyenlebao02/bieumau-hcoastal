import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import AdmZip from "adm-zip";

const FIELDS = [
  "csbhDate", "tenNhaKetNoi", "tenKhachHang", "giayToSo",
  "ngayCap", "noiCap", "diaChiHoKhau", "diaChiLienHe",
  "soDienThoai", "email", "maCan", "khuBietThu", "huong", "mauNha",
  "dienTichDat", "tongDienTichXayDung", "tongGiaXayDung", "chietKhau",
  "tongGiaBan", "chuKyNhay", "chuKyChinh", "ngayKy", "thangKy",
];

function replaceFirst(str: string, search: RegExp, replacement: string): string {
  const idx = str.search(search);
  if (idx === -1) return str;
  const match = str.match(search)!;
  return str.substring(0, idx) + replacement + str.substring(idx + match[0].length);
}

export async function POST(req: NextRequest) {
  const form = await req.json();

  const templatePath = join(process.cwd(), "public", "template.docx");
  const buffer = await readFile(templatePath);

  const zip = new AdmZip(buffer);
  const docXml = zip.readAsText("word/document.xml");

  const dotRegex = /…+/;

  let filledXml = docXml;
  for (const field of FIELDS) {
    const value = String(form[field] || "");
    if (!value) continue;
    filledXml = replaceFirst(filledXml, dotRegex, value);
  }

  // Table VVNH: replace the empty cell
  const vvnh = form.vvnhLaiSuat || "Không";
  // Find the second row, second cell in the first table and set its text
  // Simplistic: find the first empty w:t after the VVNH label
  filledXml = filledXml.replace(
    /(<w:t[^>]*>)\s*(<\/w:t>)/,
    `$1${vvnh}$2`
  );

  // Quà tặng
  const quaTang = form.quaTang || "";
  if (quaTang) {
    filledXml = replaceFirst(filledXml, dotRegex, quaTang);
  }

  zip.updateFile("word/document.xml", Buffer.from(filledXml, "utf-8"));
  const outBuffer = zip.toBuffer();

  return new Response(outBuffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="Phieu-dat-cho-Coastal-QN.docx"',
    },
  });
}
