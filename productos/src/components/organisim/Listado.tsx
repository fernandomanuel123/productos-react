import { SetStateAction, useContext, useEffect, useState } from 'react'
import { ProductoContextType } from '../../context/ProductoContext'
import ProductoContext  from '../../context/ProductoProvider'
import Lista from '../molecules/Lista'
import Axios from 'axios'
import { Producto } from '../../interfaces/Producto'
import Header from '../molecules/header/Header'


const Listado = () => {

    const {ProductosContext, setProductosContext} = useContext(ProductoContext) as ProductoContextType
    const [currentPage,setCurrentPage] = useState(1);
    const [productosPerPage, setProductosPerPage] = useState(5);

    const indexOfLastProducto = currentPage* productosPerPage
    const indexOfFirstProducto = indexOfLastProducto - productosPerPage
    const currentProductos = ProductosContext.slice(indexOfFirstProducto,indexOfLastProducto)

    const paginate = (pageNumber: number)=>{
      setCurrentPage(pageNumber)
    } 

    useEffect(()=>{
      getProductos()
    },[]);

    const getProductos = async() =>{
      const headers = {
        "Content-Type": "application/json"        
      };
      await Axios.get("https://localhost:7239/Producto", { headers })
      .then(Response =>{
        setProductosContext(Response.data)
      })
    }

  return (
    <>  
        <Header></Header>
        <Lista currentProductos={currentProductos} productosPerPage={productosPerPage} totalProductos={ProductosContext.length} paginate ={paginate}/>        
    </>
    
  )
}

export default Listado