import React,{useContext} from 'react';
import Loading from "./Loading";
import Toast from "./Toast";
import { DataContext} from "../store/GlobalState"

const Notify = () => {
    const [ state, dispatch] = useContext(DataContext);
   const { notify } = state;
    return (
    <>
    { notify.loading && <Loading/>}
    { notify.error && 
        <Toast 
            msg={{msg:notify.error, title:"Error"}}
            bgColor="bg-danger"
        />
    }
    { notify.success && 
        <Toast
            msg ={{msg:notify.success, title:"Success"}}
            bgColor="bg-success"

        />
    }

    </>
  )
}

export default Notify