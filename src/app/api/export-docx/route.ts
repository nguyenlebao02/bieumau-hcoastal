import { NextRequest } from "next/server";
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, Header, Footer,
} from "docx";

const FONT = "Times New Roman";
const SIZE = 22;
const TITLE_SIZE = 30;
const SMALL = 20;

function L(text: string, bold = false): TextRun {
  return new TextRun({ text, font: FONT, size: SIZE, bold });
}
function V(text: string): TextRun {
  return new TextRun({
    text: text || "…………………………",
    font: FONT, size: SIZE,
    color: text ? "000000" : "999999",
  });
}
function T(text: string): TextRun {
  return new TextRun({ text, font: FONT, size: TITLE_SIZE, bold: true });
}
const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const cellB = { top: border, bottom: border, left: border, right: border };

function row(label: string, value: string) {
  return new Paragraph({ spacing: { after: 40 }, children: [L(`- ${label} `), V(value)] });
}
function dual(l1: string, v1: string, l2: string, v2: string) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [L(l1), V(v1), new TextRun({ text: "        ", font: FONT, size: SIZE }), L(l2), V(v2)],
  });
}
function cell(text: string, bold: boolean, w: number) {
  return new TableCell({
    width: { size: w, type: WidthType.PERCENTAGE }, borders: cellB,
    children: [new Paragraph({ children: [new TextRun({ text, font: FONT, size: SMALL, bold })] })],
  });
}

export async function POST(req: NextRequest) {
  const f = await req.json();

  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: SIZE } } } },
    sections: [{
      properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
      headers: {
        default: new Header({ children: [new Paragraph({})] }),
      },
      footers: {
        default: new Footer({ children: [new Paragraph({})] }),
      },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [T("PHIẾU ĐĂNG KÝ ĐẶT MUA BIỆT THỰ/NHÀ Ở TẠI")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [T("DỰ ÁN COASTAL QUANG NGAI")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [L("(CSBH áp dụng ngày "), V(f.csbhDate), L(")")] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [L("TÊN NHÀ KẾT NỐI: "), V(f.tenNhaKetNoi)] }),

        new Paragraph({ spacing: { after: 80 }, children: [L("1. THÔNG TIN KHÁCH HÀNG ĐĂNG KÝ: (Dành cho khách hàng)", true)] }),
        row("Tên Công ty/Ông/Bà:", f.tenKhachHang),
        row("Giấy ĐKKD/HC/CCCD số:", f.giayToSo),
        dual("Ngày cấp:", f.ngayCap, "Nơi cấp:", f.noiCap),
        row("Địa chỉ hộ khẩu:", f.diaChiHoKhau),
        row("Địa chỉ liên hệ:", f.diaChiLienHe),
        dual("Số điện thoại:", f.soDienThoai, "Email:", f.email),

        new Paragraph({ spacing: { before: 200, after: 80 }, children: [L("2. THÔNG TIN SẢN PHẨM ĐĂNG KÝ: (Dành cho bộ phận kiểm soát):", true)] }),
        dual("Mã căn:", f.maCan, "Khu biệt thự:", f.khuBietThu),
        dual("Hướng:", f.huong, "Mẫu nhà:", f.mauNha),
        dual("Diện tích đất (m2):", f.dienTichDat, "Tổng diện tích xây dựng (m2):", f.tongDienTichXayDung),
        dual("Tổng giá Xây dựng (VNĐ):", f.tongGiaXayDung, "Chiếu khấu:", f.chietKhau),
        row("Tổng giá bán (VNĐ):", f.tongGiaBan),
        new Paragraph({ spacing: { before: 0, after: 120 }, indent: { left: 1800 }, children: [new TextRun({ text: "(Gồm KPBT tương đương 0,5% Giá bán trước thuế GTGT)", font: FONT, size: SMALL })] }),

        new Paragraph({ spacing: { before: 200, after: 80 }, children: [L("3. CHÍNH SÁCH ƯU ĐÃI THEO CSBH:", true)] }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [cell("Chương trình ưu đãi theo CSBH", true, 70), cell("Khách Hàng lựa chọn (Có/Không)", true, 30)] }),
            new TableRow({ children: [cell("1. Tham gia chương trình VVNH hỗ trợ lãi suất", false, 70), cell(f.vvnhLaiSuat || "Không", false, 30)] }),
            new TableRow({ children: [cell(`2. Quà tặng  ${f.quaTang || "…………………………"}`, false, 70), cell("", false, 30)] }),
          ],
        }),

        new Paragraph({ spacing: { before: 200, after: 80 }, children: [L("Chữ ký Khách Hàng", true)] }),
        row("Chữ ký nháy:", f.chuKyNhay),
        row("Chữ ký chính:", f.chuKyChinh),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [new TableRow({
            children: ["NHÂN VIÊN KD", "ĐẠI LÝ XÁC NHẬN", "QUẢN LÝ ĐẠI LÝ", "GĐ KINH DOANH"].map(h =>
              new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: FONT, size: SMALL, bold: true })] })] })
            ),
          })],
        }),

        new Paragraph({
          alignment: AlignmentType.RIGHT, spacing: { before: 200 },
          children: [
            new TextRun({ text: "Coastal Quang Ngai, ngày ", font: FONT, size: SIZE, italics: true }),
            V(f.ngayKy || ".."),
            new TextRun({ text: " tháng ", font: FONT, size: SIZE, italics: true }),
            V(f.thangKy || ".."),
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
