import './App.css';
import Listado from './components/organisim/Listado';
import { ProductoProvider } from './context/ProductoProvider';

function App() {
  return (
    <ProductoProvider>
      <Listado/>
    </ProductoProvider> 
  );
}
export default App;
