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

class User {
    constructor(email) {
        this._email = email; // Convention: _prefix cho thuộc tính private
        this._attempts = 0;
    }
    
    // Getter
    get email() {
        return this._email.toLowerCase();
    }
    
    // Setter với validation
    set email(newEmail) {
        if (newEmail.includes('@')) {
            this._email = newEmail;
        } else {
            console.error('Invalid email');
        }
    }
    
    // Getter tính toán
    get domain() {
        return this._email.split('@')[1];
    }
    
    // Chỉ có getter (read-only)
    get loginAttempts() {
        return this._attempts;
    }
    
    // Method để tăng attempts
    incrementAttempts() {
        this._attempts++;
    }
}

const user = new User('TRANG@Example.com');
console.log(user.email);      // "test@example.com" - tự động lowercase
console.log(user.domain);     // "example.com"

user.email = 'new@domain.com';
console.log(user.email);      // "new@domain.com"

user.incrementAttempts();
console.log(user.loginAttempts); // 1 - Chỉ đọc, không thể set trực tiếp