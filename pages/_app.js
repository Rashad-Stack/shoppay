import store from "@/app/store";
import "@/styles/globals.scss";
import Head from "next/head";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta
          name="description"
          content="Shoppay-online shopping service for all your needs."
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
