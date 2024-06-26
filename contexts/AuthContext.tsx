import { createContext } from "react"
import { Auth } from "@firebase/auth"


export const AuthContext = createContext<Auth | any>( null )