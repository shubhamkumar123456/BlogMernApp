    let User = require('../models/User')
    const bcrypt = require('bcryptjs');

    const registerUser = async (req, res) => {
        let { name, email, password } = req.body;

        try {
            let userDetails = await User.findOne({ email: email })

            if (!userDetails) {
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                // console.log(hashPassword)
            
                let details = await User.create({
                    name:name,
                    email:email,
                    password:hashPassword
                })
                return res.status(200).json({ success: true, msg: "user created successfully", details })

            }
            else {
                return res.status(200).json({ success: false, msg: "user already exists!" })
            }
        } catch (error) {
            return res.status(500).json({ success: false, msg: "error in creating user", error: error.message })
        }


    }
    const loginUser = async (req, res) => {
        let {email,password}  = req.body;

    try {
        let userDetails = await User.findOne({email:email})
        console.log(userDetails)
        if(userDetails){
            let comparePassword = bcrypt.compareSync(password, userDetails.password);
                if(comparePassword){
                return  res.status(200).json({success:true,msg:"user logged in successfully",userDetails})
                }
                else{
                    return  res.status(200).json({success:false,msg:"Wrong password"})
                }
        }
        else{
            return res.json({success:false,msg:"user not found"})
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "error in log in user", error: error.message })
    }

    }

    //update using user id
    const updateUser = async (req, res) => {
       let {name,password} = req.body
       let id = req.params._id;
       let hashPassword;
     try {
        if(password){
            const salt = await bcrypt.genSaltSync(10);
            hashPassword = await bcrypt.hashSync(password, salt);
           }
           console.log(id)
           let userExists = await User.findByIdAndUpdate(id,{$set:{name:name,password:hashPassword}})
    
           return res.status(200).json({success:true,msg:"user updated successfully"})
     } catch (error) {
            return res.status(500).json({success:false,msg:"error in updating user", error:error.message})
     }
    }

//  updated using user email

// const updateUser = async(req,res)=>{
//     let {name,email,password} = req.body

//     let userExists = await User.findOne({email})
//     console.log(userExists)
//     if(userExists){
//         let hashPassword;
//         if(password){
//             const salt = bcrypt.genSaltSync(10);
//             hashPassword = await bcrypt.hashSync(password,salt)
//                     }
//        let updatedUser =  await User.updateOne({email:userExists.email},{$set:{name:name,password:hashPassword}})
//         return res.status(200).json({success:true,msg:"user updated successfully",updatedUser})
//     }
//     else{
//         return res.status(200).json({success:false,msg:"user is not valid or not found"})
//     }

// }



    const deleteUser = async (req, res) => {
    try {
        let user =   await User.findByIdAndDelete(req.params._id)
        res.status(200).json({success:true,msg:"user deleted successfully"})
    } catch (error) {
        res.status(500).json({success:false,msg:"error in deleting user",error:error.message}) 
    }
    }

    let  getAllusers = async(req,res)=>{
        let allusers = await User.find({})
        if(allusers){
            return res.status(200).json({success:true,msg:"all users",allusers})
        }
        else{
            return res.status(404).json({success:false,msg:"no users found"})
        }
    }

    module.exports = {
        registerUser,
        loginUser,
        updateUser,
        deleteUser,
     getAllusers
    }