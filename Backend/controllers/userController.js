import User from '../models/userModel.js '
import asyncHandler from 'express-async-handler'
import generateWebToken from '../utils/generateWebToken.js'

const authUser = asyncHandler(async(req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email });


    if (user && (await user.matchPassword(password))) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateWebToken(user._id)

        })
    }


})


const registerUser = asyncHandler(async(req, res) => {

    const { name, email, password } = req.body;

    const user = await User.findOne({ email })

    if (user) {

        res.status(400)
        throw new Error("  User Alredy Exists ")
    } else {

        const user = User.create({
            name,
            email,
            password
        })

        if (user) {

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateWebToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error(" Invalid User ")
        }
    }




})

const getUserProfile = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error(" User not Found")
    }
})


export { authUser, registerUser, getUserProfile }