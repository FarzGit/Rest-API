import express from 'express'

import {UserController} from '../controller/userController'

const userController = new UserController()

const router = express.Router()



router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/logout',userController.logout)



export default router