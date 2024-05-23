"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "/src/styles/components/productCard.module.css";
import { useRouter } from "next/router";

interface Product {
  id: number;
  title: string;
  image_url: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar"
        className="search-input"
      />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <a
            key={product.id}
            href={`http://localhost:3001/products/${product.id}`}
            className={styles.productCard}
          >
            <img
              src={product.products[0]?.image_url}
              alt={product.products[0]?.title}
              className={styles.productImage}
            />
            <h3 className={styles.productTitle}>{product.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
