import React, { createContext ,useState } from 'react'
import { food_items } from '../food'

export const dataContext = createContext()

function UserContext({children}) {
   let [cate , setCate] = useState(food_items)
    let [input , setInput] = useState("")
    let data = {
        input,  
        setInput,
        cate,
        setCate
        // Add other data if needed

    }
  return (
    <dataContext.Provider value={data}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext