interface Product {
  id: number;
  title: string;
  minPrice?: number;
  medPrice?: number;
  maxPrice?: number;
  products: {
    image_url: string;
    price: number;
    title: string;
    rating: number;
    scraped_from_url: string;
    seller: string;
  }[];
  prices: { value: number; createdAt: string }[];
}

export default Product;
