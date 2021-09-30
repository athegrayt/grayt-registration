const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { create, alreadyExists, categoryById, read, update, remove, list } = require('../controllers/category')
const {userById} = require('../controllers/user')

router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, alreadyExists,create)
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, alreadyExists, update)
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove)
router.get('/categories', list)

router.param("categoryId", categoryById)
router.param("userId", userById)

module.exports = router 