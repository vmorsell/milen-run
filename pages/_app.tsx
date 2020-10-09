import type { NextComponentType, NextPageContext } from 'next'
import type { NextRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/core'
import theme from '../theme'
import { AnimateSharedLayout } from 'framer-motion'

export interface AppRenderProps {
  pageProps: object
  err?: Error
  Component: NextComponentType<NextPageContext, AppRenderProps, object>
  router: NextRouter
}

export default function App({ Component, pageProps }: AppRenderProps) {
  return (
    <ChakraProvider theme={theme}>
      <AnimateSharedLayout type="crossfade">
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </ChakraProvider>
  )
}
