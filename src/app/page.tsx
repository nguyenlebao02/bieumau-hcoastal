"use client";

import { useState, useRef } from "react";

interface FormData {
  csbhDate: string;
  tenNhaKetNoi: string;
  tenKhachHang: string;
  giayToSo: string;
  ngayCap: string;
  noiCap: string;
  diaChiHoKhau: string;
  diaChiLienHe: string;
  soDienThoai: string;
  email: string;
  maCan: string;
  khuBietThu: string;
  huong: string;
  mauNha: string;
  dienTichDat: string;
  tongDienTichXayDung: string;
  tongGiaXayDung: string;
  chietKhau: string;
  tongGiaBan: string;
  vvnhLaiSuat: string;
  quaTang: string;
  chuKyNhay: string;
  ngayKy: string;
  thangKy: string;
}

const emptyForm: FormData = {
  csbhDate: "", tenNhaKetNoi: "", tenKhachHang: "", giayToSo: "",
  ngayCap: "", noiCap: "", diaChiHoKhau: "", diaChiLienHe: "",
  soDienThoai: "", email: "", maCan: "", khuBietThu: "", huong: "",
  mauNha: "", dienTichDat: "", tongDienTichXayDung: "", tongGiaXayDung: "",
  chietKhau: "", tongGiaBan: "", vvnhLaiSuat: "Không", quaTang: "",
  chuKyNhay: "", ngayKy: "", thangKy: "",
};

const inputPrint = "border-b border-dotted border-gray-400 bg-transparent px-1 py-0.5 text-sm min-w-[80px] print:text-black print:border-black";
const labelPrint = "text-xs font-medium text-gray-600 whitespace-nowrap print:text-black";

export default function Home() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const formRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const exportPDF = () => {
    if (!formRef.current) return;
    setExporting(true);
    window.print();
    setTimeout(() => setExporting(false), 500);
  };

  const inputClass = "w-full border-b border-dotted border-gray-400 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-blue-500 placeholder:text-gray-300";
  const labelClass = "text-xs font-medium text-gray-600 whitespace-nowrap";

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Form */}
      <div className="max-w-2xl mx-auto space-y-4 no-print">
        <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between sticky top-4 z-10">
          <h1 className="text-lg font-bold text-gray-800">Phiếu đăng ký đặt mua - Coastal Quảng Ngãi</h1>
          <div className="flex gap-2">
            <button onClick={() => setForm(emptyForm)} className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition cursor-pointer">Xóa form</button>
            <button onClick={exportPDF} disabled={exporting} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer">
              {exporting ? "Đang xuất..." : "Xuất PDF"}
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 italic">
          💡 Điền thông tin rồi bấm <strong>Xuất PDF</strong>. Trình duyệt sẽ mở hộp thoại in — chọn <strong>Lưu thành PDF</strong> là xong.
        </p>
      </div>

      {/* PRINT VIEW — shown only when printing */}
      <div ref={formRef} className="max-w-2xl mx-auto bg-white p-8 print-only" style={{ fontFamily: "Times New Roman, serif" }}>
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide">Phiếu đăng ký đặt mua biệt thự/nhà ở tại</h2>
          <h2 className="text-xl font-bold uppercase mt-1">Dự án Coastal Quảng Ngãi</h2>
          <div className="flex justify-center items-center gap-2 mt-2 text-sm">
            <span>(CSBH áp dụng ngày</span>
            <span className="border-b border-dotted border-gray-400 min-w-[100px] px-2">{form.csbhDate || "............"}</span>
            <span>)</span>
          </div>
          <div className="flex justify-center items-center gap-2 mt-1 text-sm">
            <span>Tên nhà kết nối:</span>
            <span className="border-b border-dotted border-gray-400 min-w-[140px] px-2">{form.tenNhaKetNoi || "........................"}</span>
          </div>
        </div>

        {/* SECTION 1 */}
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3 border-b border-gray-300 pb-1">1. THÔNG TIN KHÁCH HÀNG ĐĂNG KÝ (Dành cho khách hàng)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[160px]"}>- Tên Cty/Ông/Bà:</span><span className={inputPrint}>{form.tenKhachHang || "........................................................................."}</span></div>
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[160px]"}>- Giấy ĐKKD/HC/CCCD số:</span><span className={inputPrint}>{form.giayToSo || "........................................................................."}</span></div>
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[160px]"}>Ngày cấp:</span><span className={inputPrint}>{form.ngayCap || "...................."}</span><span className={labelPrint}>Nơi cấp:</span><span className={inputPrint}>{form.noiCap || "......................................."}</span></div>
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[160px]"}>- Địa chỉ hộ khẩu:</span><span className={inputPrint}>{form.diaChiHoKhau || "........................................................................."}</span></div>
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[160px]"}>- Địa chỉ liên hệ:</span><span className={inputPrint}>{form.diaChiLienHe || "........................................................................."}</span></div>
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[160px]"}>- Số điện thoại:</span><span className={inputPrint}>{form.soDienThoai || "...................."}</span><span className={labelPrint}>Email:</span><span className={inputPrint}>{form.email || "......................................."}</span></div>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3 border-b border-gray-300 pb-1">2. THÔNG TIN SẢN PHẨM ĐĂNG KÝ (Dành cho bộ phận kiểm soát)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[120px]"}>- Mã căn:</span><span className={inputPrint}>{form.maCan || "...................."}</span><span className={labelPrint}>Khu biệt thự:</span><span className={inputPrint}>{form.khuBietThu || "......................................."}</span></div>
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[120px]"}>- Hướng:</span><span className={inputPrint}>{form.huong || "...................."}</span><span className={labelPrint}>Mẫu nhà:</span><span className={inputPrint}>{form.mauNha || "......................................."}</span></div>
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[120px]"}>- Diện tích đất (m²):</span><span className={inputPrint}>{form.dienTichDat || "........."}</span><span className={labelPrint}>Tổng DT xây dựng (m²):</span><span className={inputPrint}>{form.tongDienTichXayDung || "........."}</span></div>
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[120px]"}>- Tổng giá XD (VNĐ):</span><span className={inputPrint}>{form.tongGiaXayDung || "............................."}</span><span className={labelPrint}>Chiết khấu:</span><span className={inputPrint}>{form.chietKhau || "........."}</span></div>
            <div className="flex items-center gap-2"><span className={labelPrint + " min-w-[120px]"}>- Tổng giá bán (VNĐ):</span><span className={inputPrint}>{form.tongGiaBan || "........................................................................."}</span></div>
            <p className="text-xs text-gray-500 ml-[124px] print:text-gray-600">(Gồm KPBT tương đương 0,5% Giá bán trước thuế GTGT)</p>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3 border-b border-gray-300 pb-1">3. CHÍNH SÁCH ƯU ĐÃI THEO CSBH</h3>
          <table className="w-full text-sm border border-gray-300">
            <thead><tr className="bg-gray-50 print:bg-gray-100"><th className="border border-gray-300 p-2 text-left">Chương trình ưu đãi theo CSBH</th><th className="border border-gray-300 p-2 text-center w-28">Lựa chọn (Có/Không)</th></tr></thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2">1. Tham gia chương trình VVNH hỗ trợ lãi suất</td><td className="border border-gray-300 p-2 text-center">{form.vvnhLaiSuat || "Không"}</td></tr>
              <tr><td className="border border-gray-300 p-2">2. Quà tặng <span className="border-b border-dotted border-gray-400 min-w-[120px] px-2">{form.quaTang || "......................................."}</span></td><td className="border border-gray-300 p-2"></td></tr>
            </tbody>
          </table>
        </div>

        {/* SIGNATURE */}
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3 border-b border-gray-300 pb-1">Chữ ký Khách Hàng</h3>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2"><span className={labelPrint}>Chữ ký nháy:</span><span className={inputPrint}>{form.chuKyNhay || "...................."}</span></div>
          </div>
        </div>

        {/* APPROVAL TABLE */}
        <table className="w-full text-sm border border-gray-300 mb-5">
          <thead><tr className="bg-gray-50 print:bg-gray-100"><th className="border border-gray-300 p-2 text-center">NHÂN VIÊN KD</th><th className="border border-gray-300 p-2 text-center">ĐẠI LÝ XÁC NHẬN</th><th className="border border-gray-300 p-2 text-center">QUẢN LÝ ĐẠI LÝ</th><th className="border border-gray-300 p-2 text-center">GĐ KINH DOANH</th></tr></thead>
          <tbody><tr>{[0,1,2,3].map(i => <td key={i} className="border border-gray-300 p-2 h-16 align-bottom text-center text-xs text-gray-400 print:text-gray-500">(Ký & ghi rõ họ tên)</td>)}</tr></tbody>
        </table>

        {/* DATE */}
        <div className="flex justify-end text-sm">
          <div className="text-right">
            <p className="italic">Coastal Quảng Ngãi, ngày</p>
            <div className="flex items-center gap-1 justify-end mt-1">
              <span className="border-b border-dotted border-gray-400 min-w-[30px] text-center">{form.ngayKy || ".."}</span>
              <span>tháng</span>
              <span className="border-b border-dotted border-gray-400 min-w-[30px] text-center">{form.thangKy || ".."}</span>
              <span>năm 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
