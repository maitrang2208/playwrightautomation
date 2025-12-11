

function getRandomeItem<T>(items: T[]): T {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

const numbers = [1, 2, 3, 4, 5];
const luckyNumber = getRandomeItem(numbers);
console.log(`Lucky number: ${luckyNumber}`);

//dynamic có thể nhận biết kiểu dữ liệu khi truyền vào

interface User {
    username: string;
    password: string;
    email: string;
}
interface Product {
    sku: string;
    price: number;
    inStock: string;
}

interface APIResponse<T> {
    status: string;
    data: T;
    message: string;
}
const A:User={username:"admin",password:"admin123",email:""}