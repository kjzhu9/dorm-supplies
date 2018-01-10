const User = require('../models/schemas/user')

/*
* C.R.U.D. Controllers
*/
exports.createUser = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send('Must provide email')
  }
  if (!req.body.password) {
    return res.status(400).send('Must provide valid password')
  }
  if (!req.body.name) {
    return res.status(400).send('Must provide name')
  }
  //add address, classyear

  const userData = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  }
  const newUser = new User(userData)
  newUser.save((err) => {
    if (err) return next(err)
    return res.json(newUser)
  })
}

exports.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err)    
    return res.json(users)
  })
}

exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next(err)
    return res.json(user)    
  })
}

exports.getUserByEmail = (req, res, next) => {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('No user with email: ' + req.params.email)
    return res.json(user)    
  })
}

exports.updateUser = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, {}, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('Could not find user: ' + req.params.userId)
    return res.json(user)
  })
}

exports.updateUserByEmail = (req, res, next) => {
  User.findOneAndUpdate({ email: req.params.email }, req.body, {}, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('Could not find user: ' + req.params.email)
    return res.json(user)
  })
}

exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return res.status(404).send('Could not find user ' + req.params.userId)
    return res.json(user)
  })
}

exports.buy = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next(err)

  //ADD ERROR HANDLING LATER  
  // if (!req.body.email) {
  //   return res.status(400).send('Must provide email')
  // }
  // if (!req.body.password) {
  //   return res.status(400).send('Must provide valid password')
  // }
  // if (!req.body.name) {
  //   return res.status(400).send('Must provide name')
   
    const newItems = []
    for (let i = 0; i < req.body.length; i++){
      // Check if there's enough stock
      Item.findOne({ name: req.body[i].name }, (err, item) => {
        if (req.body.quantity > item.quantity) {
          return res.status(400).send('No stock left of' + req.body.name)
        }
      
        //add items to be ordered to newItems[]
        newItems.push(
          {itemId: item.itemId},
          {quantity: req.body[i].quantity},
          {price: item.itemPrice}
        )

        //update item quantity
        item.quantity -= req.body[i].quantity
        item.markModified('quantity')
        item.save((err) => {
          if (err) return next(err)
          return res.json(item)
        })
      })    
    }

    //append newOrders
    const newOrders = [{
      items: newItems
    }]
    user.orders.push(newOrders)

    //addnewitems into neworders, also add the other properties

    const userData = {
      orders: newOrders
    }

    user.markModified('orders')

    user.save((err) => {
      if (err) return next(err)
      return res.json(user)
    })
  })
}

//find by id, pull user we want
//user.save in create user route
//..
//users.markmodified
//then users.save
