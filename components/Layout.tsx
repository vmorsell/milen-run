import { ReactNode } from 'react'
import Head from 'next/head'
import { Container, Flex, Heading, HStack } from '@chakra-ui/core'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { NextChakraLink } from './NextChakraLink'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({ children, title = 'Milen med Mörsell' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container maxWidth="1200px">
      <header>
        <Flex py={4} justifyContent="space-between" alignItems="center" mb={8}>
          <Flex justifyContent="space-between" alignItems="center">
            <nav>
              <HStack spacing={12}>
                <NextChakraLink
                  href="/"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading size="lg">Milen med Mörsell</Heading>
                </NextChakraLink>
              </HStack>
            </nav>
          </Flex>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </header>
      {children}
    </Container>
  </div>
)
