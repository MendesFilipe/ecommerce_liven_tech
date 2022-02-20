interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity?: number;
}

interface ProductProps {
  products: Product[];
}

export const productContextDefaultValues: ProductProps = {
  products: [
    {
      id: 1,
      title: 'Mens Cotton Jacket',
      price: 55.99,
      description: 'great outerwear jackets for Spring/Autumn/Winter',
      image: 'https://bit.ly/3oXnd8b',
      category: "men's clothing",
      quantity: 1,
    },
  ],
};

export const productValue: Product = {
  id: 2,
  title: 'Mens Casual Slim Fit',
  price: 55.99,
  description: 'great outerwear jackets for Spring/Autumn/Winter',
  image: 'https://bit.ly/3oXnd8b',
  category: "men's clothing",
  quantity: 1,
};
