import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://organic-products.onrender.com/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div 
      className="position-relative"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1539902743451-20dfa0a92ffd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundAttachment: 'fixed', // 📌 Fixed background (doesn't scroll)
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Slightly more transparent overlay */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.6)',  // Changed from 0.85 ➡️ 0.6
          backdropFilter: 'blur(3px)',
          zIndex: 1 
        }} 
      />

      <div className="container position-relative" style={{ zIndex: 2 }}>
<h2 className="text-center pt-4 mb-4 fw-bold text-white text-shadow">
  🌱 Organic Products
</h2>        <div className="d-flex justify-content-end mb-4">
           <Link 
    to="/add-product" 
    className="btn text-white fw-semibold"
    style={{
      backgroundColor: 'rgba(0, 128, 0, 0.85)',
      border: '2px solid white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
    }}
  >
    ➕ Add New Product
  </Link>
        </div>

        <div className="row">
          {products.map(product => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div 
                className="card shadow-lg border-0 h-100"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.8)', 
                  backdropFilter: 'blur(4px)' 
                }}
              >
                <img 
                  src={product.image} 
                  className="card-img-top" 
                  alt={product.name} 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                <div className="card-body">
                  <h5 className="card-title text-success">{product.name}</h5>
                  <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
                  <Link to={`/product/${product._id}`} className="btn btn-success w-100">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
