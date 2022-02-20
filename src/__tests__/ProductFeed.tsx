import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import ProductFeed from '../components/ProductFeed';
import {
  productContextDefaultValues,
  productValue,
} from '../__mocks__/productContextDefaultValues';
import { render } from '@testing-library/react';

describe('<ProductFeed />', () => {
  test('Should render Component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductFeed {...productContextDefaultValues} />
      </Provider>
    );
    expect(getByText('Mens Cotton Jacket')).toBeTruthy();
  });
  test('changing the product and renders the title inside it', () => {
    const changeProduct = {
      products: [
        {
          ...productValue,
        },
      ],
    };
    const { getByText } = render(
      <Provider store={store}>
        <ProductFeed {...changeProduct} />
      </Provider>
    );
    expect(getByText('Mens Casual Slim Fit')).toBeTruthy();
  });
});
