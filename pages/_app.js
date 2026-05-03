import "../style/globals.css";

import { VotingProvider } from "../context/voter";
import NavBar from "../components/NavBar/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <VotingProvider>
      <NavBar />
      <Component {...pageProps} />
    </VotingProvider>
  );
}

export default MyApp;