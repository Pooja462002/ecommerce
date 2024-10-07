// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Correct import path
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';



const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      const productSnapshot = await getDocs(collection(db, 'products'));
      setProducts(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    await addDoc(collection(db, 'products'), newProduct);
    setNewProduct({ name: '', price: '' });
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, updatedProduct);
  };

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
      <input placeholder="Product Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
      <button onClick={handleAddProduct}>Add Product</button>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleUpdateProduct(product.id, { name: product.name, price: product.price })}>Update</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
