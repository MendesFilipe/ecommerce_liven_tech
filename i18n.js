import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          search: 'Search anything you need...',
          'no product': ' No product found',
          hello: 'Hello,',
          account: 'Account & Lists',
          cart: 'Cart',
          'please Wait': 'Processing, Please Wait',
          'try again': 'Oops! Something went wrong, try again later',
          'shopping cart': 'Your Shopping Cart',
          'title liven': 'E-commerce - Liven',
          'title success': 'Order Successfully Processed',
          'success message': 'Thank you, your order has been confirmed!',
          'remove cart': 'Remove from Cart',
          'add cart': 'Add to cart',
        },
      },
      pt: {
        translations: {
          search: 'Search anything you need...',
          'no product': ' No product found',
          hello: 'Hello,',
          account: 'Account & Lists',
          cart: 'Cart',
          'please Wait': 'Processing, Please Wait',
          'try again': 'Oops! Something went wrong, try again later',
          'shopping cart': 'Your Shopping Cart',
          'title liven': 'E-commerce - Liven',
          'title success': 'Order Successfully Processed',
          'success message': 'Thank you, your order has been confirmed!',
          'remove cart': 'Remove from Cart',
          'add cart': 'Add to cart',
        },
      },
      de: {
        translations: {
          search: 'Search anything you need...',
          'no product': ' No product found',
          hello: 'Hello,',
          account: 'Account & Lists',
          cart: 'Cart',
          'please Wait': 'Processing, Please Wait',
          'try again': 'Oops! Something went wrong, try again later',
          'shopping cart': 'Your Shopping Cart',
          'title liven': 'E-commerce - Liven',
          'title success': 'Order Successfully Processed',
          'success message': 'Thank you, your order has been confirmed!',
          'remove cart': 'Remove from Cart',
          'add cart': 'Add to cart',
        },
      },
    },
    fallbackLng: 'en',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
