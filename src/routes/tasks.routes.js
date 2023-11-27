import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import {getTak,getTaks,createTask,updateTask,deleteTask} from '../controllers/tasks.controllers.js';
const router=Router();
router.get('/tasks',authRequired,getTaks);
router.get('/tasks/:id',authRequired,getTak);
router.post('/tasks',authRequired,createTask);
router.put('/tasks/:id',authRequired,updateTask);
router.delete('/tasks/:id',authRequired,deleteTask);


export default router;