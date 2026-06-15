"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const PdfDocument = dynamic(() => import("./PdfDocument"), { ssr: false });

interface FormData {
  csbhDate: string; tenNhaKetNoi: string; tenKhachHang: string;
  giayToSo: string; ngayCap: string; noiCap: string; diaChiHoKhau: string;
  diaChiLienHe: string; soDienThoai: string; email: string;
  maCan: string; khuBietThu: string; huong: string; mauNha: string;
  dienTichDat: string; tongDienTichXayDung: string;
  tongGiaXayDung: string; chietKhau: string; tongGiaBan: string;
  vvnhLaiSuat: string; quaTang: string; chuKyNhay: string;
  ngayKy: string; thangKy: string;
}

const emptyForm: FormData = {
  csbhDate: "", tenNhaKetNoi: "", tenKhachHang: "", giayToSo: "",
  ngayCap: "", noiCap: "", diaChiHoKhau: "", diaChiLienHe: "",
  soDienThoai: "", email: "", maCan: "", khuBietThu: "", huong: "",
  mauNha: "", dienTichDat: "", tongDienTichXayDung: "", tongGiaXayDung: "",
  chietKhau: "", tongGiaBan: "", vvnhLaiSuat: "Không", quaTang: "",
  chuKyNhay: "", ngayKy: "", thangKy: "",
};

export default function Home() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const inputClass = "w-full border-b border-dotted border-gray-400 bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:border-blue-500 placeholder:text-gray-300";
  const labelClass = "text-xs font-medium text-gray-600 whitespace-nowrap";

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between sticky top-4 z-10">
          <h1 className="text-lg font-bold text-gray-800">Phiếu đăng ký đặt mua - Coastal Quảng Ngãi</h1>
          <div className="flex gap-2">
            <button onClick={() => setForm(emptyForm)} className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition cursor-pointer">Xóa form</button>
            <PDFDownloadLink
              document={<PdfDocument form={form} />}
              fileName="Phieu-dat-cho-Coastal-QN.pdf"
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer inline-block"
            >
              {({ loading, error }) => {
                if (error) return "❌ Lỗi";
                return loading ? "⏳ Đang tạo PDF..." : "📄 Xuất PDF";
              }}
            </PDFDownloadLink>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8" style={{ fontFamily: "Times New Roman, serif" }}>
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wide">Phiếu đăng ký đặt mua biệt thự/nhà ở tại</h2>
            <h2 className="text-xl font-bold uppercase mt-1">Dự án Coastal Quảng Ngãi</h2>
            <div className="flex justify-center items-center gap-2 mt-2 text-sm">
              <span>(CSBH áp dụng ngày</span>
              <input className="border-b border-dotted border-gray-400 w-32 text-center bg-transparent" value={form.csbhDate} onChange={(e) => update("csbhDate", e.target.value)} placeholder="............" />
              <span>)</span>
            </div>
            <div className="flex justify-center items-center gap-2 mt-1 text-sm">
              <span>Tên nhà kết nối:</span>
              <input className="border-b border-dotted border-gray-400 w-40 text-center bg-transparent" value={form.tenNhaKetNoi} onChange={(e) => update("tenNhaKetNoi", e.target.value)} placeholder="........................" />
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-sm font-bold mb-3 border-b border-gray-300 pb-1">1. THÔNG TIN KHÁCH HÀNG ĐĂNG KÝ (Dành cho khách hàng)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[160px]"}>- Tên Cty/Ông/Bà:</span><input className={inputClass} value={form.tenKhachHang} onChange={(e) => update("tenKhachHang", e.target.value)} placeholder="........................................................................." /></div>
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[160px]"}>- Giấy ĐKKD/HC/CCCD số:</span><input className={inputClass} value={form.giayToSo} onChange={(e) => update("giayToSo", e.target.value)} placeholder="........................................................................." /></div>
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[160px]"}>Ngày cấp:</span><input className={inputClass + " w-40"} value={form.ngayCap} onChange={(e) => update("ngayCap", e.target.value)} placeholder="...................." /><span className={labelClass}>Nơi cấp:</span><input className={inputClass} value={form.noiCap} onChange={(e) => update("noiCap", e.target.value)} placeholder="......................................." /></div>
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[160px]"}>- Địa chỉ hộ khẩu:</span><input className={inputClass} value={form.diaChiHoKhau} onChange={(e) => update("diaChiHoKhau", e.target.value)} placeholder="........................................................................." /></div>
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[160px]"}>- Địa chỉ liên hệ:</span><input className={inputClass} value={form.diaChiLienHe} onChange={(e) => update("diaChiLienHe", e.target.value)} placeholder="........................................................................." /></div>
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[160px]"}>- Số điện thoại:</span><input className={inputClass + " w-44"} value={form.soDienThoai} onChange={(e) => update("soDienThoai", e.target.value)} placeholder="...................." /><span className={labelClass}>Email:</span><input className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="......................................." /></div>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-sm font-bold mb-3 border-b border-gray-300 pb-1">2. THÔNG TIN SẢN PHẨM ĐĂNG KÝ (Dành cho bộ phận kiểm soát)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[120px]"}>- Mã căn:</span><input className={inputClass + " w-40"} value={form.maCan} onChange={(e) => update("maCan", e.target.value)} placeholder="...................." /><span className={labelClass}>Khu biệt thự:</span><input className={inputClass} value={form.khuBietThu} onChange={(e) => update("khuBietThu", e.target.value)} placeholder="......................................." /></div>
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[120px]"}>- Hướng:</span><input className={inputClass + " w-40"} value={form.huong} onChange={(e) => update("huong", e.target.value)} placeholder="...................." /><span className={labelClass}>Mẫu nhà:</span><input className={inputClass} value={form.mauNha} onChange={(e) => update("mauNha", e.target.value)} placeholder="......................................." /></div>
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[120px]"}>- Diện tích đất (m²):</span><input className={inputClass + " w-28"} value={form.dienTichDat} onChange={(e) => update("dienTichDat", e.target.value)} placeholder="........." /><span className={labelClass}>Tổng DT xây dựng (m²):</span><input className={inputClass + " w-28"} value={form.tongDienTichXayDung} onChange={(e) => update("tongDienTichXayDung", e.target.value)} placeholder="........." /></div>
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[120px]"}>- Tổng giá XD (VNĐ):</span><input className={inputClass + " w-44"} value={form.tongGiaXayDung} onChange={(e) => update("tongGiaXayDung", e.target.value)} placeholder="............................." /><span className={labelClass}>Chiết khấu:</span><input className={inputClass + " w-28"} value={form.chietKhau} onChange={(e) => update("chietKhau", e.target.value)} placeholder="........." /></div>
              <div className="flex items-center gap-2"><span className={labelClass + " min-w-[120px]"}>- Tổng giá bán (VNĐ):</span><input className={inputClass} value={form.tongGiaBan} onChange={(e) => update("tongGiaBan", e.target.value)} placeholder="........................................................................." /></div>
              <p className="text-xs text-gray-500 ml-[124px]">(Gồm KPBT tương đương 0,5% Giá bán trước thuế GTGT)</p>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-sm font-bold mb-3 border-b border-gray-300 pb-1">3. CHÍNH SÁCH ƯU ĐÃI THEO CSBH</h3>
            <table className="w-full text-sm border border-gray-300">
              <thead><tr className="bg-gray-50"><th className="border border-gray-300 p-2 text-left">Chương trình ưu đãi theo CSBH</th><th className="border border-gray-300 p-2 text-center w-28">Lựa chọn (Có/Không)</th></tr></thead>
              <tbody>
                <tr><td className="border border-gray-300 p-2">1. Tham gia chương trình VVNH hỗ trợ lãi suất</td><td className="border border-gray-300 p-2 text-center"><select className="bg-transparent text-sm" value={form.vvnhLaiSuat} onChange={(e) => update("vvnhLaiSuat", e.target.value)}><option>Không</option><option>Có</option></select></td></tr>
                <tr><td className="border border-gray-300 p-2">2. Quà tặng <input className="border-b border-dotted border-gray-400 w-40 ml-2 bg-transparent" value={form.quaTang} onChange={(e) => update("quaTang", e.target.value)} placeholder="......................................." /></td><td className="border border-gray-300 p-2"></td></tr>
              </tbody>
            </table>
          </div>

          <div className="mb-5">
            <h3 className="text-sm font-bold mb-3 border-b border-gray-300 pb-1">Chữ ký Khách Hàng</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2"><span className={labelClass}>Chữ ký nháy:</span><input className={inputClass + " w-40"} value={form.chuKyNhay} onChange={(e) => update("chuKyNhay", e.target.value)} placeholder="...................." /></div>
            </div>
          </div>

          <table className="w-full text-sm border border-gray-300 mb-5">
            <thead><tr className="bg-gray-50"><th className="border border-gray-300 p-2 text-center">NHÂN VIÊN KD</th><th className="border border-gray-300 p-2 text-center">ĐẠI LÝ XÁC NHẬN</th><th className="border border-gray-300 p-2 text-center">QUẢN LÝ ĐẠI LÝ</th><th className="border border-gray-300 p-2 text-center">GĐ KINH DOANH</th></tr></thead>
            <tbody><tr>{[0,1,2,3].map(i => <td key={i} className="border border-gray-300 p-2 h-16 align-bottom text-center text-xs text-gray-400">(Ký & ghi rõ họ tên)</td>)}</tr></tbody>
          </table>

          <div className="flex justify-end text-sm">
            <div className="text-right">
              <p className="italic">Coastal Quảng Ngãi, ngày</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <input className="border-b border-dotted border-gray-400 w-10 text-center bg-transparent" value={form.ngayKy} onChange={(e) => update("ngayKy", e.target.value)} placeholder=".." />
                <span>tháng</span>
                <input className="border-b border-dotted border-gray-400 w-10 text-center bg-transparent" value={form.thangKy} onChange={(e) => update("thangKy", e.target.value)} placeholder=".." />
                <span>năm 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
