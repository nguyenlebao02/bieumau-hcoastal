"use client";

import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const PdfDocument = dynamic(() => import("./PdfDocument"), { ssr: false });

export default function ExportButton({ form }: { form: any }) {
  return (
    <PDFDownloadLink
      document={<PdfDocument form={form} />}
      fileName="Phieu-dat-cho-Coastal-QN.pdf"
      className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer inline-block"
    >
      {({ loading, error }: any) => {
        if (error) return "❌ Lỗi";
        return loading ? "⏳ Đang tạo PDF..." : "📄 Xuất PDF";
      }}
    </PDFDownloadLink>
  );
}
