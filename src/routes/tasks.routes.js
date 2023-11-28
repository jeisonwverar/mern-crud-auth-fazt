import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import {getTak,getTaks,createTask,updateTask,deleteTask} from '../controllers/tasks.controllers.js';
import { validateSchema } from "../middlewares/validator.js";
import {CreateTaskSchema} from '../Schema/task.shema.js'
const router=Router();
router.get('/tasks',authRequired,getTaks);
router.get('/tasks/:id',authRequired,getTak);
router.post('/tasks',authRequired,validateSchema(CreateTaskSchema),createTask);
router.put('/tasks/:id',authRequired,updateTask);
router.delete('/tasks/:id',authRequired,deleteTask);


export default router;