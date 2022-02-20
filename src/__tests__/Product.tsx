import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Product from '../components/Product';
import { productValue } from '../__mocks__/productContextDefaultValues';
import { render } from '@testing-library/react';

describe('<Product />', () => {
  test('Should render Component', () => {
    const mockProduct = [
      {
        ...productValue,
      },
    ];
    const { getByText } = render(
      <Provider store={store}>
        {mockProduct.map(
          ({ id, title, price, description, category, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          )
        )}
      </Provider>
    );
    expect(getByText('Mens Casual Slim Fit')).toBeTruthy();
  });
});
