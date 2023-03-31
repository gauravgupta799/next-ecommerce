import { getData } from "@/utils/fetchData";
import { createContext, useReducer,useEffect} from "react";
import reducers from "./Reducers";
import {useRouter} from "next/router";

export const DataContext = createContext();

export const DataProvider =({children})=>{
    const initialState = {
        notify:{},
        auth:{},
        cart:[],
        madal:{}
    }
    const [state, dispatch] = useReducer(reducers, initialState);
    const { cart } = state;
    // const router= useRouter();

    // useEffect(()=>{
    //  const user = JSON.parse(localStorage.getItem('userData'));
    //  if(user?.token){
    //     router.push("/")
    //  }else{
    //     router.push("/signin")
    //  }    
    // },[]);

    useEffect(()=>{
        const firstLogin = localStorage.getItem("firstLogin");
        if(firstLogin){
            getData("auth/accessToken").then((res)=>{
                if(res.err) return localStorage.removeItem("firstLogin");
                dispatch({
                    type:"AUTH",
                    payload:{
                        token:res.acces_token,
                        user:res.user,
                    }
                })
            });
        }
    },[]);

    useEffect(()=>{
        const __next__cart01__grk = JSON.parse(localStorage.getItem("__next__cart01__grk"))
        if(__next__cart01__grk ){
            return dispatch({
                type:"ADD_CART",
                payload:__next__cart01__grk
            })
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem("__next__cart01__grk", JSON.stringify(cart));
    },[cart ]);

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}