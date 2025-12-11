// const settings = {
//   name:'SidebarMenu',
//   id:1,
//   review:true,
// newData bây giờ có kiểu là { id?: number; name?: string; ... }
function updateProduct(id, newData) {
    console.log("Updating product ".concat(id, " with data:"), newData);
    // Gọi API update...
}
// Hợp lệ: Chỉ update giá
updateProduct(1, { price: 20000 });
// Hợp lệ: Chỉ update tên và mô tả
updateProduct(1, { name: "Iphone 15", description: "Mới tinh" });
