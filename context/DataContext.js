import { createContext, useEffect, useState } from 'react'

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [userList, setUserList] = useState([]);


    return (
        <DataContext.Provider value={{
            userList, setUserList,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext