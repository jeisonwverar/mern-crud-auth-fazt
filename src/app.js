import  express  from "express";
import morgan from "morgan";
import routerAuth from "./routes/auth.routes.js";
import routerTask from './routes/tasks.routes.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
const  app=express();

app.use(cors({
    origin:'http://localhost:5173'
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
//routes
app.use('/api',routerAuth);
app.use('/api',routerTask);








export default app;
