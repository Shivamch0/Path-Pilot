import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler (async (req , res) => {
    const {fullName , userName , email , password , avatar} = req.body;

    if(!fullName || !userName || !email || !password){
        throw new ApiError(400 , "Fill all the Fields...");
    }

    const existedUser = await User.findOne({email});
    if(existedUser){
        throw new ApiError(400 , "User with this email already exists...")
    }

    const user = await User.create({
        fullName,
        userName,
        email,
        password,
        avatar
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshTokem"
    )
    if(!createdUser){
        throw new ApiError(400 , "Something went wrong while creating your account...")
    }

    const options = {
        httpOnly : true,
        sameSite : "None",
        maxAge : 24
    }

    return res.status(200)
            .json(new ApiResponse(200 , createdUser , "User Created Successfully..."))


});

const loginUser = asyncHandler (async (req , res) => {

});

const logoutUser = asyncHandler (async (req , res) => {

});

const refreshToken = asyncHandler (async (req , res) => {

});

const getCurrentUser = asyncHandler (async (req , res) => {

});

export { registerUser , loginUser , logoutUser , refreshToken , getCurrentUser}