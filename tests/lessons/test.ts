// // const settings = {
// //   name:'SidebarMenu',
// //   id:1,
// //   review:true,

// // } 
// // type Settings = typeof settings;
// // type settingsKeys = keyof Settings;

// interface Product {

//   id: number;

//   name: string;

//   price: number;

//   description: string;

// }
// // newData bây giờ có kiểu là { id?: number; name?: string; ... }

// function updateProduct(id: number, newData: Partial<Product>) {
//   console.log(`Updating product ${id} with data:`, newData);
//   // Gọi API update...
// }

// // Hợp lệ: Chỉ update giá

// updateProduct(1, { price: 20000 });

// // Hợp lệ: Chỉ update tên và mô tả

// // updateProduct(1, { name: "Iphone 15", description: "Mới tinh" });


//-------------
const ERROR_MESSAGES = {

    REQUIRED: "Trường này là bắt buộc",

    INVALID_EMAIL: "Email không đúng định dạng",

    MIN_LENGTH: "Phải tối thiểu 6 ký tự"

} as const; // <--- QUAN TRỌNG: Khóa cứng giá trị, không cho thành string chung chung


// 1. Lấy Keys: "REQUIRED" | "INVALID_EMAIL" | "MIN_LENGTH"
type ErrorType= typeof ERROR_MESSAGES;

type ErrorKeys = keyof ErrorType;


// 2. Lấy Values: "Trường này là bắt buộc" | ... (Lấy các value thực tế)

type ErrorValues = (ErrorType)[ErrorKeys];



// Ứng dụng: Hàm assert thông báo lỗi

function expectErrorMessage(msg: ErrorValues) {

    // Hàm này chỉ chấp nhận đúng 3 câu thông báo lỗi chuẩn đã quy định

}


expectErrorMessage("Trường này là bắt buộc"); // ✅ OK

expectErrorMessage("Lỗi linh tinh"); // ❌ Error

// T là "type parameter" - biến đại diện cho kiểu dữ liệu
function identity<T>(item: T): T {
    return item;
}

// Sử dụng:
const numberResult = identity<number>(2); // T là number
const stringResult = identity<string>("hello"); // T là string
const booleanResult = identity<boolean>(true); // T là boolean

// TypeScript tự suy luận kiểu:
const inferred = identity("auto"); // T tự động là string



// Hàm lấy phần tử đầu tiên của mảng
function getFirstElement<T>(array: T[]): T | undefined {
    return array[0];
}

// // Sử dụng:
// const numbers = [1, 2, 3];
// const firstNumber = getFirstElement<number>([1]); // number

// const strings = ["a", "b", "c"];
// const firstString = getFirstElement<string>(strings); // string

// // Tự động suy luận:
// const users = [{name: "John"}, {name: "Jane"}];
// const firstUser = getFirstElement(users); // {name: string}

// Class Data Provider cho nhiều loại test data
class DataProvider<T> {
    private data: T[];
    
    constructor(data: T[]) {
        this.data = data;
    }
    
    // Lấy item ngẫu nhiên
    getRandomItem(): T {
        const index = Math.floor(Math.random() * this.data.length);
        return this.data[index];
    }
    
    // Lấy item theo điều kiện
    findItem(predicate: (item: T) => boolean): T | undefined {
        return this.data.find(predicate);
    }
    
    // Lọc nhiều items
    filterItems(predicate: (item: T) => boolean): T[] {
        return this.data.filter(predicate);
    }
    
    // Thêm dữ liệu mới
    addItem(item: T): void {
        this.data.push(item);
    }
}

interface User {
  username: string;
  password: string;
  email: string;
}
// Sử dụng với User data:
const userData: User[] = [

    { username: 'admin', password: 'admin123', email: 'admin@test.com' },
    { username: 'user1', password: 'pass123', email: 'user1@test.com' },
    { username: 'user2', password: 'pass123', email: 'user1@test.com' }
];

const userProvider = new DataProvider<User>(userData);
const randomUser = userProvider.getRandomItem();
console.log(randomUser.username); // ✅ TypeScript biết đây là string
//console.log(randomUser.price); // ❌ LỖI: Property 'price' không tồn tại

// Tìm user cụ thể
const adminUser = userProvider.findItem(user => user.username === 'admin');
console.log(adminUser)
// // Sử dụng với Product data:
// const productProvider = new DataProvider<Product>(products);
// const expensiveProducts = productProvider.filterItems(p => p.price > 100);