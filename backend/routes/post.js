const express= require('express');
const { createPost, updatePost, deletePost, getAllUsersPost, getsinglePost, getAllPost } = require('../controllers/post');
const router = express.Router();


router.post('/create',createPost)
router.put('/update/:_id',updatePost)
router.delete('/delete/:_id',deletePost)
router.get('/allusersPosts',getAllUsersPost)
router.get('/single/:_id',getsinglePost)
router.get('/userPosts/:_id',getAllPost)




module.exports = router