const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //change these to dorm-supplies specs
    email: { type: String, unique: true },
    password: String,
    name: String,
    isAdmin: Boolean, 
    address: String,
    classYear: Number,
    orders: [{
      items: [{
        itemId: String,
        quantity: Number,
        price: Number
      }],
      purchasedDate: Date,
      delivereddate: Date,
      isPaid: Boolean
    }]
  },
  {
    toObject: { getters: true },
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    },
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

