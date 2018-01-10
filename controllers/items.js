const Item = require('../models/schemas/item')

/*
* C.R.U.D. Controllers
*/
exports.createItem = (req, res, next) => {
  if (!req.body.description) {
    return res.status(400).send('Must provide description')
  }
  if (!req.body.price) {
    return res.status(400).send('Must provide valid price')
  }
  if (!req.body.quantity) {
    return res.status(400).send('Must provide quantity')
  }
  if (!req.body.pic) {
    return res.status(400).send('Must provide pic')
  }
  
  const itemData = {
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    pic: req.body.pic
  }

  const newItem = new Item(itemData)
  //what's .save actually doing?
  newItem.save((err) => {
    if (err) return next(err)
    return res.json(newItem)
  })
}

exports.getAllItems = (req, res, next) => {
  Item.find({}, (err, items) => {
    if (err) return next(err)    
    return res.json(items)
  })
}

exports.getItemById = (req, res, next) => {
  Item.findById(req.params.userId, (err, item) => {
    if (err) return next(err)
    if (!item) return next(err)
    return res.json(item)    
  })
}

exports.getItemByName = (req, res, next) => {
  User.findOne({ name: req.params.name }, (err, item) => {
    if (err) return next(err)
    if (!item) return res.status(404).send('No item with name: ' + req.params.name)
    return res.json(item)    
  })
}

exports.updateItem = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.itemId }, req.body, {}, (err, item) => {
    if (err) return next(err)
    if (!item) return res.status(404).send('Could not find item: ' + req.params.itemId)
    return res.json(item)
  })
}

exports.updateItemByName = (req, res, next) => {
  User.findOneAndUpdate({ name: req.params.name }, req.body, {}, (err, item) => {
    if (err) return next(err)
    if (!item) return res.status(404).send('Could not find item: ' + req.params.itemId)
    return res.json(item)
  })
}

exports.deleteItem = (req, res, next) => {
  User.findByIdAndRemove(req.params.itemId, (err, item) => {
    if (err) return next(err)
    if (!item) return res.status(404).send('Could not find item ' + req.params.itemId)
    return res.json(item)
  })
}
