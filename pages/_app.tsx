import type { NextComponentType, NextPageContext } from 'next'
import type { NextRouter } from 'next/router'
//import { Chakra } from '../components/Chakra'
import { Layout } from '../components/Layout'
import { ChakraProvider } from '@chakra-ui/core'
import theme from '@chakra-ui/theme'

export interface AppRenderProps {
  pageProps: object
  err?: Error
  Component: NextComponentType<NextPageContext, AppRenderProps, object>
  router: NextRouter
}

export default function App({ Component, pageProps }: AppRenderProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout title="Milen med Mörsell">
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
