import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandle.middleware.js';

const app = express()

app.use(cors({origin:process.env.ORIGIN}))
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true , limit : '16kb'}))
app.use(cookieParser())
app.use(express.static('public'))

import authRoutes from './modules/authentication/auth.routes.js';


app.use('/api/v1/user' , authRoutes)

app.use(errorHandler);

export { app };
