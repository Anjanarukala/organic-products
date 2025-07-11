const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    brand: String,
    description: String,
    certification: String
});

module.exports = mongoose.model('Product', productSchema);
