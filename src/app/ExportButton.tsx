"use client";

import { useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

function collectFormData(): Record<string, string> {
  const formEl = document.getElementById("print-form");
  if (!formEl) return {};
  const inputs = formEl.querySelectorAll("input, select");
  const data: Record<string, string> = {};
  const fields = [
    "csbhDate", "tenNhaKetNoi", "tenKhachHang", "giayToSo", "ngayCap", "noiCap",
    "diaChiHoKhau", "diaChiLienHe", "soDienThoai", "email",
    "maCan", "khuBietThu", "huong", "mauNha", "dienTichDat", "tongDienTichXayDung",
    "tongGiaXayDung", "chietKhau", "tongGiaBan", "vvnhLaiSuat", "quaTang",
    "chuKyNhay", "chuKyChinh", "ngayKy", "thangKy",
  ];
  const values: string[] = [];
  inputs.forEach((el) => {
    if (el instanceof HTMLInputElement) values.push(el.value);
    else if (el instanceof HTMLSelectElement) values.push(el.value);
  });
  // Skip first 2 inputs (CSBH + tenNhaKetNoi are inside print-form)
  // Map collect inputs in order they appear
  let vi = 0;
  const allInputs = Array.from(inputs).filter(
    (el) => el instanceof HTMLInputElement || el instanceof HTMLSelectElement
  );
  // The first 2 are csbhDate, tenNhaKetNoi
  for (let i = 0; i < Math.min(fields.length, 2); i++) {
    if (allInputs[i]) data[fields[i]] = (allInputs[i] as HTMLInputElement | HTMLSelectElement).value;
  }
  // Then section 1 inputs (8 fields) start from index 2 in the form, but there are also 2 section inputs at same level
  // Easier: read by index directly from all input-like elements
  for (let i = 0; i < allInputs.length && i < fields.length; i++) {
    data[fields[i]] = (allInputs[i] as HTMLInputElement | HTMLSelectElement).value;
  }
  return data;
}

export default function ExportButton() {
  const [loading, setLoading] = useState(false);
  const [loadingWord, setLoadingWord] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExportPdf = async () => {
    const formEl = document.getElementById("print-form");
    if (!formEl) return;
    setLoading(true);
    setError(null);
    try {
      const canvas = await html2canvas(formEl, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let y = 0;
      while (y < imgHeight) {
        if (y > 0) pdf.addPage();
        const sliceH = Math.min(canvas.height - y * (canvas.width / imgWidth), (pageHeight * canvas.width) / imgWidth);
        const pc = document.createElement("canvas");
        pc.width = canvas.width;
        pc.height = sliceH;
        pc.getContext("2d")!.drawImage(canvas, 0, -y * (canvas.width / imgWidth));
        pdf.addImage(pc.toDataURL("image/png"), "PNG", 0, 0, imgWidth, (sliceH * imgWidth) / canvas.width);
        y += (pageHeight * canvas.width) / imgWidth;
      }
      pdf.save("Phieu-dat-cho-Coastal-QN.pdf");
    } catch (err: any) {
      setError(err?.message || "Lỗi khi tạo PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleExportWord = async () => {
    setLoadingWord(true);
    setError(null);
    try {
      const data = collectFormData();
      const res = await fetch("/api/export-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error: " + res.status);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Phieu-dat-cho-Coastal-QN.docx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err?.message || "Lỗi khi tạo Word");
    } finally {
      setLoadingWord(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExportPdf}
        disabled={loading}
        className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
      >
        {loading ? "⏳ PDF..." : "📄 Xuất PDF"}
      </button>
      <button
        onClick={handleExportWord}
        disabled={loadingWord}
        className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50 cursor-pointer"
      >
        {loadingWord ? "⏳ Word..." : "📝 Xuất Word"}
      </button>
      {error && <span className="text-xs text-red-500 self-center">❌ {error}</span>}
    </div>
  );
}
