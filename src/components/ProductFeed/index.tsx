interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface Props {
  products: IProduct[];
}

const ProductFeed: React.FC<Props> = ({ products }) => {
  return (
    <div>
      {products.map(({ id, title, price, description, category, image }) => (
        <h1>{title}</h1>
      ))}
    </div>
  );
};

export default ProductFeed;
