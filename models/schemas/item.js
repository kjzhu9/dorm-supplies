const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, unique: true },
    description: String,
    price: Number,
    quantity: Number,
    pic: String
    //businessId: { type: Schema.ObjectId, ref: 'User' } //if more logic required
  },
  {
    toObject: { getters: true },
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    },
  }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;