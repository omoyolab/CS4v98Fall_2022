import { QueueContext } from "../context/QueueContext";
import { useContext } from "react";

export const useQueueContext = () =>{
    const context = useContext(QueueContext)

    if(!context){
        throw Error('UseQueueContext must be used inside the QueueContextProvider')
    }

    return context
}