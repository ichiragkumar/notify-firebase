import { Router } from 'express';
import { UserModel } from '../models/user.model';






const router = Router();




router.post("/register-device", async( req , res) :Promise<any> => {
    const {username, email , phoneNumber, fcmTokens} = req.body;

    if(!username || !email || !phoneNumber || !fcmTokens){
        return res.status(400)
        .json({
            message:"username , email , phoneNumber , fcmTokens are required"
        })
    }

    const isUserExist = await UserModel.findOne({email})
    if(isUserExist){
        return res.status(400)
        .json({
            message:"User already exist"
        })
    }


    const user = new UserModel({
        username : username,
        email : email,
        phoneNumber : phoneNumber,
        fcmTokens: [fcmTokens]
    })
    await user.save()
    res.json({
        message:"User registered successfully"
    })
})

export default router;