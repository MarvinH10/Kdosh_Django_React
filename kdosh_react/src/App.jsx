import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { ProductosPage } from "./pages/Productos/ProductosPage";
import { ProductosFormPage } from "./pages/Productos/ProductosFormPage";
import { CategoriasPage } from "./pages/Categorias/CategoriasPage";
import { CategoriasFormPage } from "./pages/Categorias/CategoriasFormPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full">
        <Navigation />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/productos-create" element={<ProductosFormPage />} />
          <Route path="/productos/:id" element={<ProductosFormPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/categorias-create" element={<CategoriasFormPage />} />
          <Route path="/categorias/:id" element={<CategoriasFormPage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
