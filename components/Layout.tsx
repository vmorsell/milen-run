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
  Circle,
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
  backButtonLogotype: boolean
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
      <Box position="relative" overflow="hidden">
        {imageUrl && (
          <Box
            position="absolute"
            top={-10}
            left={-10}
            right={-10}
            bottom={-10}
            display="flex"
            alignItems="stretch"
            justifyContent="stretch"
            zIndex={-10}
            style={{ filter: 'blur(8px)' }}
          >
            <motion.div
              layout
              layoutId={`image-${pageId}`}
              style={{
                flex: 1,
                backgroundImage: `linear-gradient(${imageOverlay},${imageOverlay}), url(${imageUrl})`,
                backgroundColor: 'rgb(249, 245, 249)',
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
                    ><motion.div layout layoutId="logotype">
                      {backButtonLogotype && <IconButton
                              variant="ghost"
                              aria-label="Back"
                              mr={2}
                              icon={
                                <Icon
                                  as={FaChevronLeft}
                                  boxSize={5}
                                  color="#fd4e5d"
                                />
                              }
                            />}
                      {!backButtonLogotype && (
                          <Circle bgColor="#fd4e5d" p="0.4em" mr={4}>
                            <Icon as={FaRunning} boxSize={5} color="#fff" />
                          </Circle>
                        
                      )}</motion.div>

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
