import { ReactNode } from 'react'
import Head from 'next/head'
import {
  Container,
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Divider,
  Link,
  useColorModeValue,
} from '@chakra-ui/core'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Logo } from './Logo'
import { NextChakraLink } from './NextChakraLink'

type Props = {
  children?: ReactNode
  title?: string
  imageUrl?: string
}

export const Layout = ({ children, title, imageUrl }: Props) => {
  const imageOverlay = useColorModeValue(
    'rgba(255, 255, 255, 0.2)',
    'rgba(0 , 0, 0, 0.4)'
  )
  return (
    <div>
      <Head>
        <title>{title || 'Milen med Mörsell'}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box position="relative" overflow="hidden">
        {imageUrl && (
          <Box
            position="absolute"
            top="-16px"
            left="-16px"
            right="-16px"
            bottom="-16px"
            backgroundImage={`linear-gradient(${imageOverlay},${imageOverlay}), url(${imageUrl})`}
            backgroundColor="red"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            zIndex={-10}
            style={{ filter: 'blur(8px)' }}
          ></Box>
        )}
        <Container maxWidth="600px">
          <header>
            <Flex
              py={4}
              justifyContent="space-between"
              alignItems="center"
              mb={8}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <nav>
                  <HStack spacing={12}>
                    <NextChakraLink
                      href="/"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Logo h="1.5rem" pointerEvents="none" mr={4} />
                      <Heading size="lg">Milen med Mörsell</Heading>
                    </NextChakraLink>
                  </HStack>
                </nav>
              </Flex>
              <ColorModeSwitcher justifySelf="flex-end" />
            </Flex>
            {title && (
              <Heading size="xl" pt={120} pb={10}>
                {title}
              </Heading>
            )}
          </header>
        </Container>
      </Box>
      <Container maxWidth="600px" my={8}>
        {children}
        <Divider my={8} />
        <footer>
          <Text textAlign="center" my={4}>
            Running is fun 2020
          </Text>
          <Text textAlign="center" my={4}>
            Improve this site on{' '}
            <Link
              href="https://github.com/vmorsell/milen-med-morsell"
              isExternal
            >
              GitHub
            </Link>
          </Text>
        </footer>
      </Container>
    </div>
  )
}
