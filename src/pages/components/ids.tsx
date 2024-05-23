import styles from "../styles/components/productCard.module.css";

interface Product {
  id: number;
  title: string;
  image_url: string;
}

const ProductIds: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img
        src={product.products.[0]?.image_url}
        alt={product.products.[0]?.title}
        className={styles.productImage}
      />
      <h3 className={styles.productTitle}>{product.title}</h3>
    </div>
  );
};

export default ProductIds;
