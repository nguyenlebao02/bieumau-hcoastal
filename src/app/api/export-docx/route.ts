import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import AdmZip from "adm-zip";

// Field order matching the template dots
const FIELDS = [
  "csbhDate", "tenNhaKetNoi", "tenKhachHang", "giayToSo",
  "ngayCap", "noiCap", "diaChiHoKhau", "diaChiLienHe",
  "soDienThoai", "email", "maCan", "khuBietThu", "huong", "mauNha",
  "dienTichDat", "tongDienTichXayDung", "tongGiaXayDung", "chietKhau",
  "tongGiaBan", "chuKyNhay", "chuKyChinh", "ngayKy", "thangKy",
];

export async function POST(req: NextRequest) {
  const form = await req.json();

  const templatePath = join(process.cwd(), "public", "template.docx");
  const buffer = await readFile(templatePath);

  const zip = new AdmZip(buffer);
  const docXml = zip.readAsText("word/document.xml");

  // Replace each consecutive dot sequence with form values
  let filledXml = docXml;
  const dotRegex = /…+/g;

  for (const field of FIELDS) {
    const value = form[field] || "";
    if (!value) {
      // Skip this field's dots
      const match = dotRegex.exec(filledXml);
      dotRegex.lastIndex = 0;
      continue;
    }
    // Replace first dot sequence with value
    filledXml = filledXml.replace(dotRegex, value);
    // Reset lastIndex since we used replace (which creates new string)
  }

  // Handle table VVNH
  const vvnh = form.vvnhLaiSuat || "Không";
  filledXml = filledXml.replace(
    /(<w:tc>[^<]*<w:p[^>]*>[^<]*<w:r>[^<]*<w:t[^>]*>)\s*(<\/w:t>)/,
    `$1${vvnh}$2`
  );

  // Handle Quà tặng dots in table
  const quaTang = form.quaTang || "";
  if (quaTang) {
    filledXml = filledXml.replace(/…+/, quaTang);
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
