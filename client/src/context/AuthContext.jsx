import { createContext,useState,useContext } from "react";
import{registerRequest} from '../api/auth.js';
const AuthContext=createContext();
export const useAuth=()=>{
 const context=useContext(AuthContext);
 if(!context){
    throw new Error('useAuth must be used within an AuthProvider');
 }
 return context;
};
export const AuthProvider=({children})=>{
    const  [user, setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const singup=async(user)=>{
        const res= await registerRequest(user);
        console.log(res);
        setUser(user);
        setIsAuthenticated(true);

    }
    return(

<AuthContext.Provider value={{
singup,
user,
}}>
    {children}
</AuthContext.Provider>
    )
};