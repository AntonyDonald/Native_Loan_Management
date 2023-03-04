import { createContext, useEffect, useState } from 'react'

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [userList , setUserList] = useState([])


    return (
        <DataContext.Provider value={{
            userName, setUserName,password, setPassword,retypePassword, setRetypePassword,
            userList , setUserList
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext