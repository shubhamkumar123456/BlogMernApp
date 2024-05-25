const express = require('express')
const { registerUser, loginUser, updateUser, deleteUser, getAllusers } = require('../controllers/user')
const router = express.Router()


// localhost:8080/
router.post('/register',registerUser)
router.post('/backendApiLogin',loginUser)

// router.put('/:_id',updateUser)
router.put('/update',updateUser)
router.delete('/delete/:_id',deleteUser)
router.get('/getall',getAllusers)


module.exports = router