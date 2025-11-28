const settings = {
  name:'SidebarMenu',
  id:1,
  review:true,

} 
type Settings = typeof settings;
type settingsKeys = keyof Settings;

// Thợ sửa xe A có 1 bộ đồ nghề
// Công thức gốc
function nauAn(monAn: string, giaVi: string, doNgot: number): void {
    console.log(`Nấu ${monAn} với ${giaVi} và ${doNgot} gram đường`);
}

// Parameters = XEM công thức cần những gì
type CongThuc = Parameters<typeof nauAn>;
// Kết quả: [monAn: string, giaVi: string, doNgot: number]

// Giờ tôi muốn làm "phiên bản đặc biệt" của món này
function nauAnDacBiet(...nguyenLieu: CongThuc) {
    console.log("🎉 Phiên bản đặc biệt!");
    nauAn(...nguyenLieu); // Vẫn dùng đúng công thức gốc
    console.log("✨ Thêm trang trí đẹp!");
}

// Dùng thử
nauAnDacBiet("Phở", "Gừng", 10); // ✅ Đúng nguyên liệu!
// nauAnDacBiet("Phở", 123); // ❌ Lỗi: thiếu đường!