import '../styles/globals.css';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import AuthProvider from '../context/AuthContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      // Required configuration for the provider, but doesn't affect Auth.
      activeChain={ChainId.Goerli}
      authConfig={{
        // Set this to your domain to prevent phishing attacks
        domain: 'example.org',
        // The URL of your Auth API
        authUrl: '/api/auth',
      }}
      theme="dark"
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThirdwebProvider>
  );
}
