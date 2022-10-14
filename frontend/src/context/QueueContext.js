import { createContext, useReducer } from "react"

export const QueueContext = createContext()

export const queueReducer = (state, action) => {
    switch(action.type){
        case 'SET_QUEUES':
            return{
                queues: action.payload
            }
        case 'CREATE_QUEUE':
            return{
                queues:[action.payload, ...state.queues]
            }
        case 'UPDATE_QUEUE':
            const filteredQueues = state.queues.filter((q)=>q._id !== action.payload._id)
            filteredQueues.push(action.payload)
            return{
                queues: filteredQueues
            }
        case 'DELETE_QUEUE':
            return{
                queues: state.queues.filter((q)=>q._id !== action.payload._id)
            }
        default:
            return state
    }

}

export const QueueContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(queueReducer,{
        queues: null
    })

    return(
        <QueueContext.Provider value={{...state, dispatch}}>
            {children}
        </QueueContext.Provider>
    )
}

