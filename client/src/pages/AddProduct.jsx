import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    image: '',
    brand: '',
    description: '',
    certification: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://organic-products.onrender.com/products', form);
      alert('✅ Product added successfully!');
      navigate('/');
    } catch (err) {
      console.error("Error adding product:", err);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-success text-center">📦 Add New Organic Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Product Name</label>
            <input className="form-control" type="text" placeholder="e.g., Organic Turmeric Powder" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Image URL</label>
            <input className="form-control" type="text" placeholder="Paste an image link" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Brand</label>
            <input className="form-control" type="text" placeholder="e.g., Organic India" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea className="form-control" placeholder="Write about the product..." rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Certification</label>
            <input className="form-control" type="text" placeholder="e.g., FSSAI, USDA Organic" value={form.certification} onChange={e => setForm({ ...form, certification: e.target.value })} />
          </div>
          <div className="d-grid">
            <button className="btn btn-success btn-lg">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
