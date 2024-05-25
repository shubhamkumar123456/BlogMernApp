let Post = require('../models/Post')

const createPost = async (req, res) => {
   let  {title,image,description,author} = req.body
    try {
        let post = await Post.create({
            title:title,
            image:image,
            description:description,
            author:author
           })
           res.status(200).json({success:true,msg:"post created successfully",post})
    } catch (error) {
        res.status(500).json({success:false,msg:"error in creating post",error:error.message})
    }


}
const deletePost = async (req, res) => {
    let _id = req.params._id;
    try {
        await Post.findByIdAndDelete(_id)
        res.status(200).json({success:true,msg:"post deleted successfully"})
    } catch (error) {
        res.status(500).json({success:false,msg:"error in deleting post",error:error.message})
    }
}
const updatePost = async (req, res) => {
   let {title,description,image} = req.body
   let id = req.params._id;
  try {
    let post = await Post.findByIdAndUpdate({_id:id},{$set:{title,description,image}},{new:true})
    res.status(200).json({success:true,msg:"post updated successfully",post})
  } catch (error) {
        res.status(500).json({success:false,msg:"error in updating post",error:error.message})
  }
}

const getsinglePost = async (req, res) => {
    let _id = req.params._id;
    try {
       let post =  await Post.findById(_id)
        res.status(200).json({success:true,msg:"post fetched successfully",post})
    } catch (error) {
        res.status(500).json({success:false,msg:"error in getting post",error:error.message})
    }
}
const getAllPost = async (req, res) => {
        let _id = req.params._id
        try {
          let allpost = await Post.find({author:_id})  
         if(allpost.length){
            res.status(200).json({success:true,msg:"fetched all post successfully",allpost})
         }
         else{
             return res.status(404).json({success:false,msg:"no post found"})
         }
        } catch (error) {
            res.status(500).json({success:false,msg:"error in getting post",error:error.message})
        }
}
const getAllUsersPost = async (req, res) => {
    try {
        let allposts = await Post.find().populate({path:'author'});
        if(allposts){
            return res.status(200).json({success:true,msg:"all posts fetched successfully",allposts})
        }
        else{
            return res.status(404).json({success:false,msg:"no posts found"})
        }
    } catch (error) {
        res.status(500).json({success:false,msg:"error in getting all users posts",error:error.message})
    }
}

module.exports = {
    createPost,
    deletePost,
    updatePost,
    getsinglePost,
    getAllPost,
    getAllUsersPost,
}