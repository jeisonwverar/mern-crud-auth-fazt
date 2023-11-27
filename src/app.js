import  express  from "express";
import morgan from "morgan";
import routerAuth from "./routes/auth.routes.js";
import routerTask from './routes/tasks.routes.js';
import cookieParser from "cookie-parser";
const  app=express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
//routes
app.use('/api',routerAuth);
app.use('/api',routerTask);








export default app;
