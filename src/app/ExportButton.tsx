"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
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
        onclone: (clonedDoc) => {
          // Fix Tailwind v4 lab()/oklch() colors for html2canvas
          clonedDoc.querySelectorAll("*").forEach((el) => {
            const htmlEl = el as HTMLElement;
            const style = window.getComputedStyle(htmlEl);
            if (style.color && style.color !== "rgba(0, 0, 0, 0)") htmlEl.style.color = style.color;
            const bg = style.backgroundColor;
            if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") htmlEl.style.backgroundColor = bg;
          });
        },
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let y = 0;

      while (y < imgHeight) {
        if (y > 0) pdf.addPage();
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        const sliceHeight = Math.min(canvas.height - y * (canvas.width / imgWidth), (pageHeight * canvas.width) / imgWidth);
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, -y * (canvas.width / imgWidth));
        pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, (sliceHeight * imgWidth) / canvas.width);
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
