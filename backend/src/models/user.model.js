import mongoose from "mongoose";

// const userSchema=new mongoose.Schema(
//     {
//         email:{
//             type:String,
//             required:true,
//             unique:true,
//         },
//         fullName:{
//             type:String,
//             required:true,
//         },
//         password:{
//             type:String,
//             required:true,
//             minlength:6,
//         },
//         profilePic:{
//             type:String,
//             default:"",
//         },
//         points:{
//             type:Number,
//             default:100, // Starting points for new users
//         },
//         bio:{
//             type:String,
//             default:"",
//             maxlength:500,
//         },
//         location:{
//             city:{
//                 type:String,
//                 default:"",
//             },
//             state:{
//                 type:String,
//                 default:"",
//             },
//             country:{
//                 type:String,
//                 default:"",
//             }
//         },
//         phone:{
//             type:String,
//             default:"",
//         },
//         isActive:{
//             type:Boolean,
//             default:true,
//         },
//         swapsCompleted:{
//             type:Number,
//             default:0,
//         },
//         rating:{
//             type:Number,
//             default:5.0,
//             min:1,
//             max:5,
//         },
//         totalRatings:{
//             type:Number,
//             default:0,
//         }
//     },
//     {timestamps: true}
// );

// const User=mongoose.model("User",userSchema)

// export default User

// backend/models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", userSchema);

export default User;
