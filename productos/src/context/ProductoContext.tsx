import { Producto } from "../interfaces/Producto"

export type ProductoContextType = {
    ProductosContext: Array<Producto>;
    setProductosContext: (value: Array<Producto>) => void;
}