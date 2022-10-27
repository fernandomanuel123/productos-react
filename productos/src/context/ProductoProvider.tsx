import { createContext, ReactNode, useState } from "react"
import { Producto } from "../interfaces/Producto";

const Context = createContext({});

interface Props{
    children: ReactNode
}

export function ProductoProvider({children}: Props) {

    const [ProductosContext,setProductosContext] = useState<Array<Producto>>([]);

    return <Context.Provider value={{ProductosContext,setProductosContext}}>
                {children}
            </Context.Provider>
    
}

export default Context


