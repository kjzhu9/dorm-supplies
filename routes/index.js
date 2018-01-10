const express = require('express')
const router = express.Router()

const users = require('../controllers/users')
const items = require('../controllers/items')


/*
* ~~~~ Routes for users ~~~~
*/
router.route('/users')
	.get(users.getAllUsers)
	.post(users.createUser)

router.route('/users/:userId/id')
	.get(users.getUserById)
	.put(users.updateUser)
	.delete(users.deleteUser)

router.route('/users/:email/email')
	.get(users.getUserByEmail)
	.put(users.updateUserByEmail)
	//.delete

 router.route('/users/:userId/buy')
 	.put(users.buy)

/*
* ~~~~ Routes for items ~~~~
*/
router.route('/items')
	.get(items.getAllItems)
	.post(items.createItem)

router.route('/items/:itemId/id')
	.get(items.getItemById)
	.put(items.updateItem)
	.delete(items.deleteItem)

router.route('/items/:name/name')
	.get(items.getItemByName)
	.put(items.updateItemByName)


module.exports = router