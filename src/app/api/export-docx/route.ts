import { NextRequest } from "next/server";
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, Header,
} from "docx";

const FONT = "Times New Roman";
const SIZE = 22; // 11pt in half-points
const TITLE_SIZE = 30; // 15pt
const SMALL = 20; // 10pt

function labelRun(text: string, bold = false): TextRun {
  return new TextRun({ text, font: FONT, size: SIZE, bold });
}
function valueRun(text: string): TextRun {
  return new TextRun({ text: text || "…………………………", font: FONT, size: SIZE, color: text ? "000000" : "999999" });
}
function titleRun(text: string): TextRun {
  return new TextRun({ text, font: FONT, size: TITLE_SIZE, bold: true });
}
function smallRun(text: string): TextRun {
  return new TextRun({ text, font: FONT, size: SMALL });
}

const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const cellBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

export async function POST(req: NextRequest) {
  const form = await req.json();

  const doc = new Document({
    styles: {
      default: { document: { run: { font: FONT, size: SIZE } } },
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 720, bottom: 720, left: 720, right: 720 }, // 0.5 inch
        },
      },
      children: [
        // ===== TITLE =====
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [titleRun("PHIẾU ĐĂNG KÝ ĐẶT MUA BIỆT THỰ/NHÀ Ở TẠI")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [titleRun("DỰ ÁN COASTAL QUANG NGAI")] }),

        // CSBH date
        new Paragraph({
          alignment: AlignmentType.CENTER, spacing: { after: 40 },
          children: [labelRun("(CSBH áp dụng ngày "), valueRun(form.csbhDate), labelRun(")")],
        }),
        // Tên nhà kết nối
        new Paragraph({
          alignment: AlignmentType.CENTER, spacing: { after: 200 },
          children: [labelRun("TÊN NHÀ KẾT NỐI: "), valueRun(form.tenNhaKetNoi)],
        }),

        // ===== SECTION 1 =====
        new Paragraph({ spacing: { after: 80 }, children: [labelRun("1. THÔNG TIN KHÁCH HÀNG ĐĂNG KÝ: (Dành cho khách hàng)", true)] }),
        row("Tên Công ty/Ông/Bà:", form.tenKhachHang),
        row("Giấy ĐKKD/HC/CCCD số:", form.giayToSo),
        dualRow("Ngày cấp:", form.ngayCap, "Nơi cấp:", form.noiCap),
        row("Địa chỉ hộ khẩu:", form.diaChiHoKhau),
        row("Địa chỉ liên hệ:", form.diaChiLienHe),
        dualRow("Số điện thoại:", form.soDienThoai, "Email:", form.email),

        // ===== SECTION 2 =====
        new Paragraph({ spacing: { before: 200, after: 80 }, children: [labelRun("2. THÔNG TIN SẢN PHẨM ĐĂNG KÝ: (Dành cho bộ phận kiểm soát):", true)] }),
        dualRow("Mã căn:", form.maCan, "Khu biệt thự:", form.khuBietThu),
        dualRow("Hướng:", form.huong, "Mẫu nhà:", form.mauNha),
        dualRowSmall("Diện tích đất (m2):", form.dienTichDat, "Tổng diện tích xây dựng (m2):", form.tongDienTichXayDung),
        dualRow("Tổng giá Xây dựng (VNĐ):", form.tongGiaXayDung, "Chiếu khấu:", form.chietKhau),
        row("Tổng giá bán (VNĐ):", form.tongGiaBan),
        new Paragraph({
          spacing: { before: 0, after: 120 },
          indent: { left: 1800 },
          children: [smallRun("(Gồm KPBT tương đương 0,5% Giá bán trước thuế GTGT)")],
        }),

        // ===== SECTION 3 =====
        new Paragraph({ spacing: { before: 200, after: 80 }, children: [labelRun("3. CHÍNH SÁCH ƯU ĐÃI THEO CSBH:", true)] }),
        policyTable(form.vvnhLaiSuat, form.quaTang),

        // ===== CHỮ KÝ KHÁCH HÀNG =====
        new Paragraph({ spacing: { before: 200, after: 80 }, children: [labelRun("Chữ ký Khách Hàng", true)] }),
        row("Chữ ký nháy:", form.chuKyNhay),
        row("Chữ ký chính:", form.chuKyChinh),

        // ===== SIGNATURE TABLE =====
        sigTable(),

        // ===== DATE =====
        new Paragraph({
          alignment: AlignmentType.RIGHT, spacing: { before: 200 },
          children: [
            new TextRun({ text: "Coastal Quang Ngai, ngày ", font: FONT, size: SIZE, italics: true }),
            valueRun(form.ngayKy || ".."),
            new TextRun({ text: " tháng ", font: FONT, size: SIZE, italics: true }),
            valueRun(form.thangKy || ".."),
            new TextRun({ text: " năm 2026", font: FONT, size: SIZE, italics: true }),
          ],
        }),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="Phieu-dat-cho-Coastal-QN.docx"',
    },
  });
}

// Helpers
function row(label: string, value: string) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: `- ${label} `, font: FONT, size: SIZE }),
      valueRun(value),
    ],
  });
}

function dualRow(l1: string, v1: string, l2: string, v2: string) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: `${l1} `, font: FONT, size: SIZE }),
      new TextRun({ text: (v1 || "…………………………") + "        ", font: FONT, size: SIZE, color: v1 ? "000000" : "999999" }),
      new TextRun({ text: `${l2} `, font: FONT, size: SIZE }),
      valueRun(v2),
    ],
  });
}

function dualRowSmall(l1: string, v1: string, l2: string, v2: string) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: `${l1} `, font: FONT, size: SIZE }),
      new TextRun({ text: (v1 || "……………") + "        ", font: FONT, size: SIZE, color: v1 ? "000000" : "999999" }),
      new TextRun({ text: `${l2} `, font: FONT, size: SIZE }),
      new TextRun({ text: v2 || "……………", font: FONT, size: SIZE, color: v2 ? "000000" : "999999" }),
    ],
  });
}

function policyTable(vvnh: string, quaTang: string) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          cell("Chương trình ưu đãi theo CSBH", true, 70),
          cell("Khách Hàng lựa chọn (Có/Không)", true, 30),
        ],
      }),
      new TableRow({
        children: [
          cell("1. Tham gia chương trình VVNH hỗ trợ lãi suất", false, 70),
          cell(vvnh || "Không", false, 30),
        ],
      }),
      new TableRow({
        children: [
          cell(`2. Quà tặng  ${quaTang || "…………………………"}`, false, 70),
          cell("", false, 30),
        ],
      }),
    ],
  });
}

function sigTable() {
  const headers = ["NHÂN VIÊN KD", "ĐẠI LÝ XÁC NHẬN", "QUẢN LÝ ĐẠI LÝ", "GĐ KINH DOANH"];
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: headers.map((h) =>
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: cellBorders,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: FONT, size: SMALL, bold: true })] })],
          })
        ),
      }),
    ],
  });
}

function cell(text: string, bold: boolean, widthPct: number) {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    borders: cellBorders,
    children: [new Paragraph({ children: [new TextRun({ text, font: FONT, size: SMALL, bold })] })],
  });
}
