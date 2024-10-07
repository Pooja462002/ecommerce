// backend/index.js
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Admin SDK setup
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<YOUR-FIREBASE-PROJECT>.firebaseio.com',
});

// Routes
app.use('/api/products', productRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
