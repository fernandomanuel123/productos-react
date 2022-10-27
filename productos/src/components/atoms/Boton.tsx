type props = {
  nombre: String
  
}

const Boton = ({nombre}:props) => {
  return (
    <button>{nombre}</button>
  )
}

export default Boton