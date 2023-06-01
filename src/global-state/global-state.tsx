import {createContext, useContext, useState} from 'react'

interface GlobalState {
    route: string
}

const initialState = {
    route: "/"
}

const GlobalContext = createContext(null)

export const GlobalState = (props: any) => {
    const [globalState, setGlobalState] = useState({})
    
    const updateGlobalState = (key: string, newValue: any) => {
        setGlobalState((oldState: any) => {
            if (oldState[key] !== newValue) {
                const newState = { ...oldState }
                newState[key] = newValue
                return newState
            } else {
                return oldState
            }
        })
    }
    
    return (
        <GlobalContext.Provider value={[globalState, updateGlobalState] as any}>{props.children}</GlobalContext.Provider>
    )
}

// Hook to access app state
export const useGlobalState = () => useContext(GlobalContext)
