// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Get reference to Firestore
const db = admin.firestore();
const productCollection = db.collection('products');

// CRUD operations

// Create Product
router.post('/', async (req, res) => {
  try {
    const product = req.body;
    await productCollection.add(product);
    res.status(201).send('Product added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const snapshot = await productCollection.get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update Product
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = req.body;
    await productCollection.doc(productId).update(product);
    res.status(200).send('Product updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await productCollection.doc(productId).delete();
    res.status(200).send('Product deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
