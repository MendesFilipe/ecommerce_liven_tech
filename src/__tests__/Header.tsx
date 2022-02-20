import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Hearder from '../components/Header';
import { productContextDefaultValues } from '../__mocks__/productContextDefaultValues';
import { render, screen } from '@testing-library/react';
import '../../i18n';

describe('<Header />', () => {
  test('Should render Component', () => {
    render(
      <Provider store={store}>
        <Hearder {...productContextDefaultValues} />
      </Provider>
    );
    const headerText = screen.getAllByText(/^Hello/);

    expect(headerText.length).toBe(1);
  });
});
