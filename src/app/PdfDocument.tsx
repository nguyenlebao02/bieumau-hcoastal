"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export interface FormData {
  csbhDate: string; tenNhaKetNoi: string; tenKhachHang: string;
  giayToSo: string; ngayCap: string; noiCap: string; diaChiHoKhau: string;
  diaChiLienHe: string; soDienThoai: string; email: string;
  maCan: string; khuBietThu: string; huong: string; mauNha: string;
  dienTichDat: string; tongDienTichXayDung: string;
  tongGiaXayDung: string; chietKhau: string; tongGiaBan: string;
  vvnhLaiSuat: string; quaTang: string; chuKyNhay: string;
  ngayKy: string; thangKy: string;
}

const pdfStyles = StyleSheet.create({
  page: { padding: 28, fontFamily: "Times-Roman", fontSize: 10, lineHeight: 1.5 },
  title: { fontSize: 13, fontWeight: "bold", textAlign: "center", textTransform: "uppercase" },
  title2: { fontSize: 15, fontWeight: "bold", textAlign: "center", textTransform: "uppercase", marginTop: 4 },
  subtitle: { fontSize: 10, textAlign: "center", marginTop: 8, marginBottom: 6, flexDirection: "row", justifyContent: "center" },
  sectionTitle: { fontSize: 10, fontWeight: "bold", marginTop: 12, marginBottom: 6, borderBottom: "1px solid #999", paddingBottom: 2 },
  row: { flexDirection: "row", marginBottom: 4, alignItems: "center" },
  label: { fontSize: 9, color: "#444", minWidth: 110 },
  value: { fontSize: 9, borderBottom: "1px dotted #999", minWidth: 60, paddingHorizontal: 4 },
  table: { borderWidth: 1, borderColor: "#999", marginTop: 6 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f0f0f0" },
  th1: { flex: 3, borderRightWidth: 1, borderColor: "#999", padding: 5, fontSize: 9, fontWeight: "bold" },
  th2: { flex: 1, padding: 5, fontSize: 9, fontWeight: "bold", textAlign: "center" },
  tableRow: { flexDirection: "row", borderTopWidth: 1, borderColor: "#999" },
  td1: { flex: 3, borderRightWidth: 1, borderColor: "#999", padding: 5, fontSize: 9 },
  td2: { flex: 1, padding: 5, fontSize: 9, textAlign: "center" },
  sigTable: { borderWidth: 1, borderColor: "#999", marginTop: 12, flexDirection: "row" },
  sigCell: { flex: 1, borderRightWidth: 1, borderColor: "#999", padding: 5, height: 50, justifyContent: "flex-end", alignItems: "center" },
  sigCellLast: { flex: 1, padding: 5, height: 50, justifyContent: "flex-end", alignItems: "center" },
  sigLabel: { fontSize: 7, color: "#888", textAlign: "center" },
  date: { textAlign: "right", marginTop: 12, fontStyle: "italic", fontSize: 10 },
  note: { fontSize: 7, color: "#888", marginTop: 2, marginLeft: 114 },
});

export default function PdfDocument({ form }: { form: FormData }) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.title}>Phiếu đăng ký đặt mua biệt thự/nhà ở tại</Text>
        <Text style={pdfStyles.title2}>Dự án Coastal Quảng Ngãi</Text>
        <View style={pdfStyles.subtitle}>
          <Text>(CSBH áp dụng ngày </Text>
          <Text style={pdfStyles.value}>{form.csbhDate || "............"}</Text>
          <Text>)</Text>
        </View>
        <View style={[pdfStyles.subtitle, { marginTop: 2 }]}>
          <Text>Tên nhà kết nối: </Text>
          <Text style={pdfStyles.value}>{form.tenNhaKetNoi || "........................"}</Text>
        </View>
        <Text style={pdfStyles.sectionTitle}>1. THÔNG TIN KHÁCH HÀNG ĐĂNG KÝ (Dành cho khách hàng)</Text>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 135 }]}>- Tên Cty/Ông/Bà:</Text><Text style={[pdfStyles.value, { flex: 1 }]}>{form.tenKhachHang}</Text></View>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 135 }]}>- Giấy ĐKKD/HC/CCCD số:</Text><Text style={[pdfStyles.value, { flex: 1 }]}>{form.giayToSo}</Text></View>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 135 }]}>Ngày cấp:</Text><Text style={[pdfStyles.value, { width: 100 }]}>{form.ngayCap}</Text><Text style={pdfStyles.label}>Nơi cấp:</Text><Text style={[pdfStyles.value, { flex: 1 }]}>{form.noiCap}</Text></View>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 135 }]}>- Địa chỉ hộ khẩu:</Text><Text style={[pdfStyles.value, { flex: 1 }]}>{form.diaChiHoKhau}</Text></View>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 135 }]}>- Địa chỉ liên hệ:</Text><Text style={[pdfStyles.value, { flex: 1 }]}>{form.diaChiLienHe}</Text></View>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 135 }]}>- Số điện thoại:</Text><Text style={[pdfStyles.value, { width: 120 }]}>{form.soDienThoai}</Text><Text style={pdfStyles.label}>Email:</Text><Text style={[pdfStyles.value, { flex: 1 }]}>{form.email}</Text></View>

        <Text style={pdfStyles.sectionTitle}>2. THÔNG TIN SẢN PHẨM ĐĂNG KÝ (Dành cho bộ phận kiểm soát)</Text>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 100 }]}>- Mã căn:</Text><Text style={[pdfStyles.value, { width: 100 }]}>{form.maCan}</Text><Text style={pdfStyles.label}>Khu biệt thự:</Text><Text style={[pdfStyles.value, { flex: 1 }]}>{form.khuBietThu}</Text></View>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 100 }]}>- Hướng:</Text><Text style={[pdfStyles.value, { width: 100 }]}>{form.huong}</Text><Text style={pdfStyles.label}>Mẫu nhà:</Text><Text style={[pdfStyles.value, { flex: 1 }]}>{form.mauNha}</Text></View>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 100 }]}>- Diện tích đất (m²):</Text><Text style={[pdfStyles.value, { width: 80 }]}>{form.dienTichDat}</Text><Text style={pdfStyles.label}>Tổng DT xây dựng (m²):</Text><Text style={[pdfStyles.value, { width: 80 }]}>{form.tongDienTichXayDung}</Text></View>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 100 }]}>- Tổng giá XD (VNĐ):</Text><Text style={[pdfStyles.value, { width: 160 }]}>{form.tongGiaXayDung}</Text><Text style={pdfStyles.label}>Chiết khấu:</Text><Text style={[pdfStyles.value, { width: 80 }]}>{form.chietKhau}</Text></View>
        <View style={pdfStyles.row}><Text style={[pdfStyles.label, { minWidth: 100 }]}>- Tổng giá bán (VNĐ):</Text><Text style={[pdfStyles.value, { flex: 1 }]}>{form.tongGiaBan}</Text></View>
        <Text style={pdfStyles.note}>(Gồm KPBT tương đương 0,5% Giá bán trước thuế GTGT)</Text>

        <Text style={pdfStyles.sectionTitle}>3. CHÍNH SÁCH ƯU ĐÃI THEO CSBH</Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableHeader}>
            <View style={pdfStyles.th1}><Text>Chương trình ưu đãi theo CSBH</Text></View>
            <View style={pdfStyles.th2}><Text>Lựa chọn (Có/Không)</Text></View>
          </View>
          <View style={pdfStyles.tableRow}>
            <View style={pdfStyles.td1}><Text>1. Tham gia chương trình VVNH hỗ trợ lãi suất</Text></View>
            <View style={pdfStyles.td2}><Text>{form.vvnhLaiSuat}</Text></View>
          </View>
          <View style={pdfStyles.tableRow}>
            <View style={pdfStyles.td1}><Text>2. Quà tặng  {form.quaTang}</Text></View>
            <View style={pdfStyles.td2}><Text> </Text></View>
          </View>
        </View>

        <Text style={pdfStyles.sectionTitle}>Chữ ký Khách Hàng</Text>
        <View style={pdfStyles.row}><Text style={pdfStyles.label}>Chữ ký nháy:</Text><Text style={[pdfStyles.value, { width: 120 }]}>{form.chuKyNhay}</Text></View>

        <View style={pdfStyles.sigTable}>
          <View style={pdfStyles.sigCell}><Text style={pdfStyles.sigLabel}>NHÂN VIÊN KD</Text><Text style={pdfStyles.sigLabel}>(Ký & ghi rõ họ tên)</Text></View>
          <View style={pdfStyles.sigCell}><Text style={pdfStyles.sigLabel}>ĐẠI LÝ XÁC NHẬN</Text><Text style={pdfStyles.sigLabel}>(Ký & ghi rõ họ tên)</Text></View>
          <View style={pdfStyles.sigCell}><Text style={pdfStyles.sigLabel}>QUẢN LÝ ĐẠI LÝ</Text><Text style={pdfStyles.sigLabel}>(Ký & ghi rõ họ tên)</Text></View>
          <View style={pdfStyles.sigCellLast}><Text style={pdfStyles.sigLabel}>GĐ KINH DOANH</Text><Text style={pdfStyles.sigLabel}>(Ký & ghi rõ họ tên)</Text></View>
        </View>

        <View style={pdfStyles.date}>
          <Text>Coastal Quảng Ngãi, ngày {form.ngayKy || ".."} tháng {form.thangKy || ".."} năm 2026</Text>
        </View>
      </Page>
    </Document>
  );
}
