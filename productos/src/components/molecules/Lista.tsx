import { useContext, useEffect, useState } from "react"
import { ProductoContextType } from "../../context/ProductoContext"
import { Producto } from "../../interfaces/Producto"
import ProductoContext  from '../../context/ProductoProvider'
import Boton from "../atoms/Boton"
import Label from "../atoms/Label"
import '../molecules/lista.css';

type props = {
  productosPerPage: Number
  totalProductos: Number
  paginate: any
  currentProductos: Array<Producto>
  
}
const Lista = ({productosPerPage,totalProductos,paginate,currentProductos}:props ) => {

  const {ProductosContext, setProductosContext} = useContext(ProductoContext) as ProductoContextType
  const [order,setOrder] = useState(true)
  const [listaTemporal,setListaTemporal] = useState(Array<Producto>)
  const [valorMaximo,setValorMaximo] = useState(String)
  const [valorMinimo,setValorMinimo] = useState(String)
  const pageNumbers = [];

  for(let i= 1; i <= Math.ceil(Number(totalProductos)/Number(productosPerPage)); i++){
      pageNumbers.push(i);
  }

  const sort = ()=>{
    var productos = [...ProductosContext]
    if(order){
    productos.sort(function(a, b) {
      return Number(b.precio) - Number(a.precio);    
    });
  }else{
    productos.sort(function(a, b) {
      return Number(a.precio) - Number(b.precio);    
    });
  }
  setProductosContext(productos)
  setOrder(!order)
  }

  useEffect(()=>{
    setListaTemporal([...ProductosContext])
  },[]);

  const restringuirRangoPrecio = (min: number, max:number) =>{
    setListaTemporal([...ProductosContext])
    setProductosContext(ProductosContext.filter(function (el) {
      return el.precio >= min &&
             el.precio <= max                          
    }))
  }

  return (
    <>
      <div className="ComboDeOpciones">
      <Label value={"Ingrese precio mínimo"}></Label>
      <input className= 'GenericInput' onChange={(e)=>setValorMinimo(e.target.value)} value = {valorMinimo}/>

      <Label value={"Ingrese precio máximo"}></Label>
      <input className= "GenericInput" onChange={(e)=>setValorMaximo(e.target.value)}  value = {valorMaximo}/>

      <button className="GenericButtom CursorPointer" onClick={()=> restringuirRangoPrecio(Number(valorMinimo),Number(valorMaximo))}>Restringir valor</button>
  
      </div>      
    
    <table id= "tabla">
    <tr>
    <th>Id</th>
    <th>Nombre</th>
    <th className="CursorPointer" onClick={sort}>Precio</th>
    <th>Stock</th>
    <th>Fecha de registro</th>
  </tr>
    {
      currentProductos.map(producto=>(
        <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{producto.precio}</td>
            <td>{producto.stock}</td>
            <td>{producto.fechaRegistro.toString()}</td>
            
        </tr>
    ))}
  
</table>

        
          <div>
            {pageNumbers.map(number=>(
              <li key = {number}>
              <a onClick={()=>paginate} href="!#">
                {number}
              </a>
              </li>
              ))}
          </div>          
        
    </>
  )
}

export default Lista