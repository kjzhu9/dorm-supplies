# dorm-supplies
API for dorm supplies delivery app

# Dorm Supplies Planning

### Basic Objects

#### User
```js
{
  id,
  email: String,
  hash: String,
  name: String,
  isAdmin: Boolean,
  address: String,
  classYear: Number,
  orders: [{
    items: [{
      itemId: String,
      quantity: Number,
      price: Number
    }]
    purchasedDate: Date,
    delivereddate: Date,
    isPaid: Boolean
  }]
}
```

#### Item
```js
{
  id, 
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  pic: String
}
