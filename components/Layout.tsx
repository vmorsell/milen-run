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
  Icon,
  useColorModeValue,
  Center,
  IconButton,
} from '@chakra-ui/core'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { FaRunning, FaChevronLeft } from 'react-icons/fa'
import { NextChakraLink } from './NextChakraLink'
import { motion } from 'framer-motion'
import Markdown from 'react-markdown'
import renderers from '../utils/md_renderers'
import { ILayout } from '../@types/generated/contentful'

type Props = {
  children?: ReactNode
  title?: string
  superTitle?: string
  imageUrl?: string
  pageId?: string
  layout: ILayout
  backButtonLogotype?: boolean
}

export const Layout = ({
  children,
  title,
  superTitle,
  imageUrl,
  pageId,
  layout,
  backButtonLogotype = false,
}: Props) => {
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
      <Box position="relative">
        {imageUrl && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={-1}
            display="flex"
            justifyContent="stretch"
            alignItems="stretch"
          >
            <motion.div
              layout
              layoutId={`image-${pageId}`}
              style={{ flex: '1 1 0', display: 'flex' }}
            >
              <svg id="svg" style={{ flex: '1 1 0' }}>
                <filter id="svgFilter" width="100%" height="100%" x="0" y="0">
                  <feGaussianBlur
                    id="svgGaussianBlur"
                    in="SourceGraphic"
                    stdDeviation="10"
                  ></feGaussianBlur>
                  <feComponentTransfer>
                    <feFuncA type="discrete" tableValues="1 1" />
                  </feComponentTransfer>
                </filter>
                <image
                  xlinkHref={imageUrl}
                  filter="url(#svgFilter)"
                  width="100%"
                  height="100%"
                  x="0"
                  y="0"
                  preserveAspectRatio="xMidYMid slice"
                ></image>
              </svg>
            </motion.div>
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
                      <IconButton
                        isRound
                        mr={2}
                        colorScheme="red"
                        aria-label={
                          backButtonLogotype ? 'Back' : layout.fields.title
                        }
                        icon={
                          backButtonLogotype ? (
                            <Icon as={FaChevronLeft} boxSize={5} color="#fff" />
                          ) : (
                            <Icon as={FaRunning} boxSize={5} color="#fff" />
                          )
                        }
                      />
                      <Heading size="lg">{layout.fields.title}</Heading>
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
                  {superTitle && (
                    <Text
                      as="span"
                      size="xl"
                      textTransform="uppercase"
                      fontWeight="bolder"
                    >
                      {superTitle}
                    </Text>
                  )}
                </motion.div>
                <motion.div layout layoutId={`heading-${pageId ?? ''}`}>
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
          <Center>
            <Markdown source={layout.fields.footer} renderers={renderers} />
          </Center>
        </footer>
      </Container>
    </div>
  )
}
