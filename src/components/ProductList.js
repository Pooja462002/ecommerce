// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Correct import path
import { collection, getDocs } from 'firebase/firestore';



const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productSnapshot = await getDocs(collection(db, 'products'));
      setProducts(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
