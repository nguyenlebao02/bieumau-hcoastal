"use client";

import { useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export default function ExportButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    const formEl = document.getElementById("print-form");
    if (!formEl) return;

    setLoading(true);
    setError(null);

    try {
      const canvas = await html2canvas(formEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

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

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
    >
      {error ? `❌ ${error}` : loading ? "⏳ Đang tạo PDF..." : "📄 Xuất PDF"}
    </button>
  );
}
