import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    userName : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    }, 
    password : {
        type : String,
        required :true,
        minlength : 6
    },
    avatar : {
        type : String,
    },
    refreshToken : {
        type : String
    }
},
    {timestamps : true}
);

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10);
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = async function () {
    await jwt.sign({
        _id : this._id,
        fullName : this.fullName,
        userName : this.userName,
        email : this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expireIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = async function () {
    await jwt.sign({
        _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expireIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User" , userSchema);