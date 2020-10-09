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
  Icon,
  useColorModeValue,
  Circle,
} from '@chakra-ui/core'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { FaRunning } from 'react-icons/fa'
import { NextChakraLink } from './NextChakraLink'
import { motion } from 'framer-motion'

type Props = {
  children?: ReactNode
  title?: string
  imageUrl?: string
  pageId?: string
}

export const Layout = ({ children, title, imageUrl, pageId }: Props) => {
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
            top="-16"
            left="-16"
            right="-16px"
            bottom="-16px"
            flex="1"
            zIndex={-10}
            style={{ filter: 'blur(8px)' }}
          >
            <motion.div
              layoutId={`image-${pageId}`}
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(${imageOverlay},${imageOverlay}), url(${imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></motion.div>
          </Box>
        )}
        <Container>
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
                      <Circle bgColor="#fd4e5d" p="0.4em" mr={4}>
                        <Icon as={FaRunning} boxSize={5} color="#fff" />
                      </Circle>

                      <Heading size="lg">Milen med Mörsell</Heading>
                    </NextChakraLink>
                  </HStack>
                </nav>
              </Flex>
              <ColorModeSwitcher justifySelf="flex-end" />
            </Flex>
            {title && (
              <Box pt={120} pb={10}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      opacity: 0,
                    },
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 0.4,
                        duration: 0.2,
                      },
                    },
                  }}
                >
                  <Text
                    as="span"
                    size="xl"
                    textTransform="uppercase"
                    fontWeight="bolder"
                  >
                    Milen med Mörsell:
                  </Text>
                </motion.div>
                <motion.div layoutId={`heading-${pageId ?? ''}`}>
                  <Heading size="xl" fontWeight="bolder">
                    {title}
                  </Heading>
                </motion.div>
              </Box>
            )}
          </header>
        </Container>
      </Box>
      <Container my={8}>
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
