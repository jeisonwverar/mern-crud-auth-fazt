import { createContext,useState,useContext,useEffect } from "react";
import{registerRequest,loginRequest,verifyTokenRequest} from '../api/auth.js';
import Cookies from 'js-cookie';
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
        const [errors,setErrors]=useState([]);
        const [loading,setLoading]=useState(true);
        const singup=async(user)=>{
            try {

            const res= await registerRequest(user);
            console.log(res);
            setUser(user);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response)
           setErrors(error.response.data)
        }
        }

        const signin =async (user)=>{
            try {
                const res=  await loginRequest(user); 
                
                console.log(res)
                setIsAuthenticated(true);
                setUser(res.data)
            } catch (error) {
                //console.log(error.response.data.error)
                if(Array.isArray(error.response.data)){

                    setErrors(error.response.data)
                }

                setErrors([error.response.data.message])
            }
        }

    useEffect(()=>{
        let timer=null;
        if(errors.length>0){
         timer = setTimeout(() => {
            setTimeout
                setErrors([])
            },5000)
        }


        return()=>clearTimeout(timer)
           

    },[errors])    

    useEffect(()=>{
        async function  checkLogin () {
            const cookies= Cookies.get();
        if(!cookies.token){
            setIsAuthenticated(false);
            setLoading(false)
            return setUser(null)
        }
        try {
            const res= await  verifyTokenRequest(cookies.token);
            if(!res.data){ 
                setIsAuthenticated(false)
            
                setLoading(false);
                return;
            }
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false);
                
            } catch (error) {
                //console.error(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }

        }

        
        checkLogin();
    },[])

    const logout=()=>{
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null)
        
    }

    return(
    
    <AuthContext.Provider value={{
    singup,
    signin,
    loading,
    logout,
    user,
    isAuthenticated,
    errors
    }}>
    {children}
    </AuthContext.Provider>
    )

};