import Product from '../Product';
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
        <Product
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          category={category}
          image={image}
        />
      ))}
    </div>
  );
};

export default ProductFeed;
