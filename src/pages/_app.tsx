import { Provider } from 'react-redux';
import { store } from '../app/store';
import { Provider as AuthProvider } from 'next-auth/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '../../i18n';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
