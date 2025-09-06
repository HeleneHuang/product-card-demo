import ProductDetail from './pages/Product/ProductDetail'
import Products from './pages/Products/Products';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/products/:id",
    element: <ProductDetail />
  }
]);

const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App
