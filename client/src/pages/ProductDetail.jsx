import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Product fetch error:", err));

    axios.get(`http://localhost:5000/feedback/${id}`)
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error("Feedback fetch error:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/feedback/', { productId: id, name, message });
      setFeedbacks(prev => [...prev, { name, message }]);
      setName('');
      setMessage('');
    } catch (err) {
      console.error("Feedback submission error:", err);
    }
  };

  if (!product) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mb-4 bg-light border-0">
        <h2 className="text-success mb-3">{product.name}</h2>
        <img
          src={product.image}
          className="img-fluid rounded mb-3"
          alt={product.name}
          style={{ height: '300px', objectFit: 'cover', width: '100%' }}
        />
        <p><strong>Brand:</strong> <span className="badge bg-primary">{product.brand}</span></p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Certification:</strong> <span className="badge bg-warning text-dark">{product.certification}</span></p>
      </div>

      <hr className="my-4" />

      <div className="card p-4 mb-4 bg-white border-0 shadow-sm">
        <h4 className="text-success">💬 Leave Feedback</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              className="form-control"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              placeholder="Your Feedback"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>

      <div className="card p-4 bg-white border-0 shadow-sm">
        <h4 className="text-primary mb-3">📢 Feedback</h4>
        {feedbacks.length === 0 ? (
          <p className="text-muted">No feedback yet.</p>
        ) : (
          feedbacks.map((fb, index) => (
            <div key={index} className="mb-3 p-2 border-bottom">
              <strong className="text-success">{fb.name}</strong>
              <p className="mb-0">{fb.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
