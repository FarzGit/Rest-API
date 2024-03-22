

import express,{Request, Response} from 'express'
import cookeiParser from 'cookie-parser'
import doteenv from 'dotenv'
import conectDb from './config/db'
import router from './routers/userRouter'

conectDb(); 

doteenv.config()

const app = express()

app.use(cookeiParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api',router)


app.listen(3000,()=>{
    console.log('server connected')
})