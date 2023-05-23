import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../features/shared/components/Layout'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { OnlineStatusProvider } from '@/features/connectivity/components/OnlineStatusProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OnlineStatusProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </OnlineStatusProvider>
  )
}
