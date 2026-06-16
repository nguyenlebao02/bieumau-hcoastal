"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ExportButton = dynamic(() => import("./ExportButton"), { ssr: false });

interface FormData {
  csbhDate: string; tenNhaKetNoi: string; tenKhachHang: string;
  giayToSo: string; ngayCap: string; noiCap: string; diaChiHoKhau: string;
  diaChiLienHe: string; soDienThoai: string; email: string;
  maCan: string; khuBietThu: string; huong: string; mauNha: string;
  dienTichDat: string; tongDienTichXayDung: string;
  tongGiaXayDung: string; chietKhau: string; tongGiaBan: string;
  vvnhLaiSuat: string; quaTang: string; chuKyNhay: string; chuKyChinh: string;
  ngayKy: string; thangKy: string;
}

const emptyForm: FormData = {
  csbhDate: "", tenNhaKetNoi: "", tenKhachHang: "", giayToSo: "",
  ngayCap: "", noiCap: "", diaChiHoKhau: "", diaChiLienHe: "",
  soDienThoai: "", email: "", maCan: "", khuBietThu: "", huong: "",
  mauNha: "", dienTichDat: "", tongDienTichXayDung: "", tongGiaXayDung: "",
  chietKhau: "", tongGiaBan: "", vvnhLaiSuat: "Không", quaTang: "",
  chuKyNhay: "", chuKyChinh: "", ngayKy: "", thangKy: "",
};

export default function Home() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const dotInput = "border-b border-dotted border-gray-400 bg-transparent text-center focus:outline-none focus:border-blue-500 text-[13px]";
  const dotInputFull = dotInput + " flex-1 min-w-[60px] px-1";

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between sticky top-4 z-10">
          <h1 className="text-lg font-bold text-gray-800">Phiếu đăng ký đặt mua - Coastal Quảng Ngãi</h1>
          <div className="flex gap-2">
            <button onClick={() => setForm(emptyForm)} className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition cursor-pointer">Xóa form</button>
            <ExportButton />
          </div>
        </div>

        {/* Form — matches original DOCX exactly */}
        <div id="print-form" className="bg-white rounded-xl shadow-lg p-10" style={{ fontFamily: "Times New Roman, serif", fontSize: "13px", lineHeight: "1.7" }}>

          {/* Title */}
          <div className="text-center mb-1">
            <h2 className="text-[15px] font-bold uppercase tracking-wide">Phiếu đăng ký đặt mua biệt thự/nhà ở tại</h2>
            <h2 className="text-[17px] font-bold uppercase mt-1 tracking-wider">Dự án Coastal Quang Ngai</h2>
          </div>

          {/* CSBH + Tên nhà kết nối */}
          <div className="text-center mt-3 mb-5 space-y-1">
            <div className="flex items-center justify-center gap-1">
              <span>(CSBH áp dụng ngày</span>
              <input className={dotInput + " w-[130px]"} value={form.csbhDate} onChange={(e) => update("csbhDate", e.target.value)} placeholder="........................" />
              <span>)</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span>Tên nhà kết nối:</span>
              <input className={dotInput + " w-[200px]"} value={form.tenNhaKetNoi} onChange={(e) => update("tenNhaKetNoi", e.target.value)} placeholder="................................" />
            </div>
          </div>

          {/* Section 1 */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2">1. THÔNG TIN KHÁCH HÀNG ĐĂNG KÝ: (Dành cho khách hàng)</h3>
            <div className="space-y-1.5 ml-3">
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">- Tên Công ty/Ông/Bà:</span>
                <input className={dotInputFull} value={form.tenKhachHang} onChange={(e) => update("tenKhachHang", e.target.value)} placeholder="........................................................................." />
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">- Giấy ĐKKD/HC/CCCD số:</span>
                <input className={dotInputFull} value={form.giayToSo} onChange={(e) => update("giayToSo", e.target.value)} placeholder="........................................................................." />
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">Ngày cấp:</span>
                <input className={dotInput + " w-[130px]"} value={form.ngayCap} onChange={(e) => update("ngayCap", e.target.value)} placeholder="........................" />
                <span className="whitespace-nowrap text-[13px] ml-4">Nơi cấp:</span>
                <input className={dotInputFull} value={form.noiCap} onChange={(e) => update("noiCap", e.target.value)} placeholder="........................................" />
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">- Địa chỉ hộ khẩu:</span>
                <input className={dotInputFull} value={form.diaChiHoKhau} onChange={(e) => update("diaChiHoKhau", e.target.value)} placeholder="........................................................................." />
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">- Địa chỉ liên hệ:</span>
                <input className={dotInputFull} value={form.diaChiLienHe} onChange={(e) => update("diaChiLienHe", e.target.value)} placeholder="........................................................................." />
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">- Số điện thoại:</span>
                <input className={dotInput + " w-[140px]"} value={form.soDienThoai} onChange={(e) => update("soDienThoai", e.target.value)} placeholder="........................" />
                <span className="whitespace-nowrap text-[13px] ml-4">Email:</span>
                <input className={dotInputFull} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="........................................" />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2">2. THÔNG TIN SẢN PHẨM ĐĂNG KÝ: (Dành cho bộ phận kiểm soát):</h3>
            <div className="space-y-1.5 ml-3">
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">- Mã căn:</span>
                <input className={dotInput + " w-[130px]"} value={form.maCan} onChange={(e) => update("maCan", e.target.value)} placeholder="........................" />
                <span className="whitespace-nowrap text-[13px] ml-4">Khu biệt thự:</span>
                <input className={dotInputFull} value={form.khuBietThu} onChange={(e) => update("khuBietThu", e.target.value)} placeholder="........................................" />
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">- Hướng:</span>
                <input className={dotInput + " w-[130px]"} value={form.huong} onChange={(e) => update("huong", e.target.value)} placeholder="........................" />
                <span className="whitespace-nowrap text-[13px] ml-4">Mẫu nhà:</span>
                <input className={dotInputFull} value={form.mauNha} onChange={(e) => update("mauNha", e.target.value)} placeholder="........................................" />
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">- Diện tích đất (m2):</span>
                <input className={dotInput + " w-[80px]"} value={form.dienTichDat} onChange={(e) => update("dienTichDat", e.target.value)} placeholder="........." />
                <span className="whitespace-nowrap text-[13px] ml-4">Tổng diện tích xây dựng (m2):</span>
                <input className={dotInput + " w-[80px]"} value={form.tongDienTichXayDung} onChange={(e) => update("tongDienTichXayDung", e.target.value)} placeholder="........." />
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">- Tổng giá Xây dựng (VNĐ):</span>
                <input className={dotInput + " w-[170px]"} value={form.tongGiaXayDung} onChange={(e) => update("tongGiaXayDung", e.target.value)} placeholder="..............................." />
                <span className="whitespace-nowrap text-[13px] ml-4">Chiếu khấu:</span>
                <input className={dotInput + " w-[80px]"} value={form.chietKhau} onChange={(e) => update("chietKhau", e.target.value)} placeholder="........." />
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">- Tổng giá bán (VNĐ):</span>
                <input className={dotInputFull} value={form.tongGiaBan} onChange={(e) => update("tongGiaBan", e.target.value)} placeholder="........................................................................." />
              </div>
              <p className="text-[11px] text-gray-500 ml-[175px]">(Gồm KPBT tương đương 0,5% Giá bán trước thuế GTGT)</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2">3. CHÍNH SÁCH ƯU ĐÃI THEO CSBH:</h3>
            <table className="w-full text-[13px] border border-gray-400">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 p-2 text-left font-bold">Chương trình ưu đãi theo CSBH</th>
                  <th className="border border-gray-400 p-2 text-center w-[180px] font-bold">Khách Hàng lựa chọn (Có/Không)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2">1. Tham gia chương trình VVNH hỗ trợ lãi suất</td>
                  <td className="border border-gray-400 p-2 text-center">
                    <select className="bg-transparent text-[13px]" value={form.vvnhLaiSuat} onChange={(e) => update("vvnhLaiSuat", e.target.value)}>
                      <option>Không</option><option>Có</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2">
                    2. Quà tặng
                    <input className={dotInput + " w-[200px] ml-2"} value={form.quaTang} onChange={(e) => update("quaTang", e.target.value)} placeholder="......................................." />
                  </td>
                  <td className="border border-gray-400 p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Chữ ký Khách Hàng */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2">Chữ ký Khách Hàng</h3>
            <div className="space-y-1.5 ml-3">
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">Chữ ký nháy:</span>
                <input className={dotInput + " w-[200px]"} value={form.chuKyNhay} onChange={(e) => update("chuKyNhay", e.target.value)} placeholder="................................" />
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[13px]">Chữ ký chính:</span>
                <input className={dotInput + " w-[200px]"} value={form.chuKyChinh} onChange={(e) => update("chuKyChinh", e.target.value)} placeholder="................................" />
              </div>
            </div>
          </div>

          {/* Signature table */}
          <table className="w-full text-[13px] border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-center font-bold">NHÂN VIÊN KD</th>
                <th className="border border-gray-400 p-2 text-center font-bold">ĐẠI LÝ XÁC NHẬN</th>
                <th className="border border-gray-400 p-2 text-center font-bold">QUẢN LÝ ĐẠI LÝ</th>
                <th className="border border-gray-400 p-2 text-center font-bold">GĐ KINH DOANH</th>
              </tr>
            </thead>
          </table>

          {/* Date */}
          <div className="flex justify-end text-[13px]">
            <div className="text-right">
              <p className="italic">Coastal Quang Ngai, ngày</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <input className={dotInput + " w-10"} value={form.ngayKy} onChange={(e) => update("ngayKy", e.target.value)} placeholder=".." />
                <span>tháng</span>
                <input className={dotInput + " w-10"} value={form.thangKy} onChange={(e) => update("thangKy", e.target.value)} placeholder=".." />
                <span>năm 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
