import ProductCard from './components/ProductCard';
import { demoProduct } from './data/products';

function App() {
  return (
    <div>
      <ProductCard product={demoProduct} />
    </div>
  );
}

export default App
