import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3Provider } from '@providers'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalProvider from '@providers/global'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <GlobalProvider>
        <Web3Provider>
          <Component {...pageProps} />
        </Web3Provider>
      </GlobalProvider>
    </>
  )
}
