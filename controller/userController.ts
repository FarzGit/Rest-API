
import { Request, Response } from "express";
import {User,UserDetails} from '../models/userModel'
import {generateToken} from '../utils/generateToken'


class UserController{

    async register(req:Request,res:Response): Promise<void>{

        try{

            const {name,email,mobile,password}:UserDetails = req.body
            const userExist = await User.findOne({email:email})

            if(userExist){
                res.status(400);
                throw new Error("User already exists");
            }

            const user = await User.create({
                name,
                email,
                password,
                mobile,
              });

              if (user) {
                generateToken(res, user._id);
                res.status(201).json({
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  mobile: user.mobile,
                });
              } else {
                res.status(400);
                throw new Error("Invalid user data");
              }

        }catch(error){
            console.log(error)
            res.status(500).send("Server Error");
        }

    }


    async login(req:Request,res:Response):Promise<void>{

        try{

            const { email, password }: UserDetails = req.body;
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
          res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        });

        
      } else {
        res.status(401);
        throw new Error("Invalid email or password");
      }

        }catch(error){
            console.log(error);
            res.status(500).send('server error')
            
        }

    }


    async logout(req:Request,res:Response):Promise<void>{

        try{

            res.cookie('jwt',"",{
                httpOnly: true,
                expires: new Date(0)
            })
            res.status(200).json({ message: 'Logged out successfully'});

        }catch(error){
            console.log(error)
            res.status(500).send('server error')
        }



    }


}

export {UserController}


