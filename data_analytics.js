const users = [
  { id: 1, name: "Amit", country: "India", premium: true },
  { id: 2, name: "John", country: "USA", premium: false },
  { id: 3, name: "Riya", country: "India", premium: true },
  { id: 4, country: "Germany", premium: false }, // missing name intentionally
  { id: 5, name: "Neha", country: "India", premium: false },
];
 
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000 },
  { id: 2, name: "E-book", category: "Digital", price: 15 },
  { id: 3, category: "Fashion", price: 200 }, // missing name
  { id: 4, name: "Headphones", category: "Electronics", price: 120 },
  { id: 5, name: "Course", category: "Digital", price: 50 },
];
 
const orders = [
  { orderId: 1, userId: 1, productId: 1, quantity: 2 },
  { orderId: 2, userId: 2, productId: 2, quantity: 1 },
  { orderId: 3, userId: 1, productId: 4, quantity: 3 },
  { orderId: 4, userId: 5, productId: 5, quantity: 4 },
  { orderId: 5, userId: 3, productId: 3, quantity: 2 },
  { orderId: 6, userId: 9, productId: 2, quantity: 1 }, // invalid user
];


// Step 1:- Data Preprocessing and Data Cleaning
console.log(users);
console.log(products);
console.log(orders);


// Fill missing user names with "Unknown" 
const updatedUsers = users.map((user) => ({
  id: user.id,
  name: user.name || "Unknown",
  country: user.country,
  premium: user.premium,
}));

// Fill missing product names with "Unknown"
const updatedProducts = products.map((product) => ({
  id: product.id,
  name: product.name || 'Unknown',
  category: product.category,
  price: product.price,
  
}));

// Remove only invalid orders (invalid user or product)
const updatedOrders = orders.filter(
  (order) =>
    updatedUsers.some((user) => user.id === order.userId) &&
    updatedProducts.some((product) => product.id === order.productId)
);

// Checking the Data after Preprocessing.
console.log("Preprocessed Data:");
console.log(updatedUsers);
console.log(updatedProducts);
console.log(updatedOrders);


// Step 2: - Compute Using .reduce().

// This Fuction helps as in finding the user and product.

const getUser = (id) => updatedUsers.find(u => u.id === id);
const getProduct = (id) => updatedProducts.find((p) => p.id === id);

// 1. Total Revenue. 

const totalRevenue = updatedOrders.reduce((sum, order) => {
  const product = getProduct(order.productId);
  const revenue = product.price * order.quantity;
  return sum + revenue;
}, 0);

console.log("Total Revenue:", totalRevenue);

//  2. Total item Sold.

const totalItemSold = updatedOrders.reduce((sum,order) => {
      return sum + order.quantity;
}, 0);

console.log("Total Item Sold:", totalItemSold);

// 3. Revenue by country.

const revenueByCountry = updatedOrders.reduce((acc, order) => {
  const user = getUser(order.userId);
  const product = getProduct(order.productId);
  const revenue = product.price * order.quantity;

  if (!acc[user.country]) acc[user.country] = 0;
  acc[user.country] += revenue;

  return acc;
}, {});

console.log("Revenue By Country:",revenueByCountry);

// 4. Top spending user.

const userSpending = updatedOrders.reduce((acc, order) => {
  const user = getUser(order.userId);
  const product = getProduct(order.productId);
  const spent = product.price * order.quantity;

  acc[user.name] = (acc[user.name] || 0) + spent;
  return acc;
}, {});

const topUser = Object.entries(userSpending).reduce(
  (top, [name, spent]) => (spent > top.spent ? { name, spent } : top),
  { name: "", spent: 0 }
);

console.log("Top spending user:" ,topUser);

// 5. Most sold product.
     
const productSales = updatedOrders.reduce((acc, order) => {
  const product = getProduct(order.productId);
  acc[product.name] = (acc[product.name] || 0) + order.quantity;
  return acc;
}, {});

const mostSoldProduct = Object.entries(productSales).reduce(
  (top, [name, quantity]) => (quantity > top.quantity ? { name, quantity } : top),
  { name: "", quantity: 0 }
);

console.log("Most Sold Product:", mostSoldProduct);

// 6. Average order value.

const avgOrderValue = totalRevenue/ updatedOrders.length;
console.log("Average order value:", avgOrderValue);


// Step 3:- Update the Price with 10% of GST.

const productsWithGST = updatedProducts.map((product) => ({
      ...product,
      price: (product.price * 1.1). toFixed(0),
}));

console.log("Product Price with GST:");
console.log(productsWithGST);



