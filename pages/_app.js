import { useEffect, useContext } from "react";
import Layout from '../components/layout';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
