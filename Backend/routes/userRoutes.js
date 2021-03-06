import express from 'express'

const router = express.Router()

import { authUser, getUserProfile } from '../controllers/userController.js'

import { protect } from '../middileware/authMiddleware.js'


router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile)







export default router