"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Star, Heart, Shop } from "../components/Icons";
import styles from "../../styles/components/ids.module.css";
import PriceHistoryChart from "../components/PriceHistoryChart";
import Product from "./ProductInterface";
import { formatPrice } from "./PriceUtils";

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/products/${id}`
          );
          setProduct(response.data);
          setSelectedImage(response.data.products[0]?.image_url);
          setSelectedTitle(response.data.products[0]?.title);
          setSelectedRating(response.data.products[0]?.rating);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const NavigateTo = (url: string) => {
    if (url) {
      router.push(url);
    } else {
      console.error("404");
    }
  };

  const ProductClick = (prod: {
    image_url: string;
    title: string;
    rating: number;
  }) => {
    setSelectedImage(prod.image_url);
    setSelectedTitle(prod.title);
    setSelectedRating(prod.rating);
  };

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.productHeader}>
        <div className={styles.imageThumbnails}>
          {product.products.slice(0, 3).map((prod, index) => (
            <img
              key={index}
              src={prod.image_url}
              className={styles.otherProducts}
              alt="Product Thumbnail"
              onClick={() => ProductClick(prod)}
            />
          ))}
        </div>
        <div className={styles.productCard}>
          <img
            src={selectedImage}
            className={styles.productImage}
            alt="Product"
          />
          <div
            className={`${styles.HeartIcon} ${isFavorited ? styles.favorited : ""}`}
            onClick={toggleFavorite}
          >
            <Heart />
          </div>
        </div>
        <div className={styles.productDetails}>
          <h1 className={styles.productTitle}>{selectedTitle}</h1>
          <div className={styles.ratingSection}>
            <Star />
            <span className={styles.rating}>{selectedRating}</span>
          </div>
          <p className={styles.description}>Descrição</p>
          <div className={styles.priceInfo}>
            <p className={styles.priceLabel}>Preços de&nbsp;</p>
            <p className={styles.priceValue}>
              <strong>
                {product.minPrice !== undefined &&
                product.maxPrice !== undefined
                  ? `${formatPrice(product.minPrice)} a ${formatPrice(product.maxPrice)}`
                  : "N/A"}{" "}
              </strong>
            </p>
          </div>
          <div className={styles.priceComparison}>
            <div>
              <span className={styles.priceLabel}>Preço médio</span>
              <span className={styles.priceValue}>
                {formatPrice(product.medPrice)}
              </span>
              <a
                href={product.products[0]?.scraped_from_url}
                className={styles.Link}
              >
                {product.products[0]?.seller}
              </a>
            </div>
            <div>
              <span className={styles.priceLabel}>Menor preço</span>
              <span className={styles.priceValue}>
                {formatPrice(product.minPrice)}
              </span>
              <a
                href={product.products[1]?.scraped_from_url}
                className={styles.Link}
              >
                {product.products[1]?.seller}
              </a>
            </div>
            <div>
              <span className={styles.priceLabel}>Maior preço</span>
              <span className={styles.priceValue}>
                {formatPrice(product.maxPrice)}
              </span>
              <a
                href={product.products[2]?.scraped_from_url}
                className={styles.Link}
              >
                {product.products[2]?.seller}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.storeList}>
        {product.products.map((store, index) => (
          <div key={index} className={styles.storeItem}>
            <div className={styles.storeLogo}>{store.seller}</div>
            <div className={styles.storeIcon}>
              <Shop />
              <span className={styles.storeText}>
                Veja todos os produtos da {store.seller} no Price Keeper
              </span>
            </div>
            <div className={styles.storePrice}>{formatPrice(store.price)}</div>
          </div>
        ))}
      </div>
      <div className={styles.priceHistory}>
        <h3>Histórico de preço</h3>
        <PriceHistoryChart data={product.prices} />
      </div>
    </div>
  );
};

export default ProductDetails;
