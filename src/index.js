import app from "./app.js";
import { connectDB } from "./db.js";
app.listen(3000,()=>{
    try {
        connectDB();
        console.log(`Server on port http://localhost:3000`)
    } catch (error) {
        
    }
});