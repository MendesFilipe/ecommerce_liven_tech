import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import QuantityCount from '../components/QuantityCount';
import { quantityCountContextDefaultValues } from '../__mocks__/quantityCountContext';
import { render } from '@testing-library/react';

describe('<QuantityCount />', () => {
  test('Should render Component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <QuantityCount {...quantityCountContextDefaultValues} />
      </Provider>
    );
    expect(getByText('1')).toBeTruthy();
  });
  test('changing the value and renders the text inside it', () => {
    const changeMockQuantityCount = {
      ...quantityCountContextDefaultValues,
      quantity: 2,
    };
    const { getByText } = render(
      <Provider store={store}>
        <QuantityCount {...changeMockQuantityCount} />
      </Provider>
    );
    expect(getByText('2')).toBeTruthy();
  });
});
