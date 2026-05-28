import { createContext , useState} from "react"

const ThemeContext = createContext("light")

export function ThemeProvider({children}){
    const [theme,setTheme] = useState("light")

    return(
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
