const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const Product = require('./models/Product');
const Feedback = require('./models/Feedback');

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // or your deployed frontend
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => console.error("Error inserting sample data:", err));

// --- Product Routes ---
// Add new product
app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add product' });
    }
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// --- Feedback Routes ---

// Post feedback
app.post('/feedback', async (req, res) => {
    const { productId, name, message } = req.body;
    try {
        const feedback = new Feedback({ productId, name, message });
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Get all feedbacks for a product

app.get('/feedback/:id', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ productId: new mongoose.Types.ObjectId(req.params.id) });
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
