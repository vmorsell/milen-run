import type { NextComponentType, NextPageContext } from 'next'
import type { NextRouter } from 'next/router'
import { Chakra } from '../components/Chakra'
import { Layout } from '../components/Layout'

export interface AppRenderProps {
  pageProps: object
  err?: Error
  Component: NextComponentType<NextPageContext, AppRenderProps, object>
  router: NextRouter
  cookies?: string
}

export default function App({ Component, pageProps, cookies }: AppRenderProps) {
  return (
    <Chakra cookies={cookies}>
      <Layout title="Milen med Mörsell">
        <Component {...pageProps} />
      </Layout>
    </Chakra>
  )
}
