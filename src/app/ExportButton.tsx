"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  { ssr: false }
);

const PdfDocument = dynamic(() => import("./PdfDocument"), { ssr: false });

export default function ExportButton({ form }: { form: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const blob = await pdf(<PdfDocument form={form} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Phieu-dat-cho-Coastal-QN.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err?.message || "Lỗi khi tạo PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
    >
      {error ? `❌ ${error}` : loading ? "⏳ Đang tạo PDF..." : "📄 Xuất PDF"}
    </button>
  );
}
