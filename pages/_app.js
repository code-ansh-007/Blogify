import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </AuthContextProvider>
  );
}

export default MyApp;
