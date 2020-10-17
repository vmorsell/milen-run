import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/core'
import { NextChakraLink } from '../components/NextChakraLink'
import { formatDate, timeTo } from '../utils/date'
import { IRace } from '../@types/generated/contentful'
import { motion } from 'framer-motion'

export interface RaceTileProps {
  race: IRace
  listIndex: number
}

export const RaceTile = ({ race, listIndex }: RaceTileProps) => {
  const imageOverlay = useColorModeValue(
    'rgba(255, 255, 255, 0.4)',
    'rgba(0 , 0, 0, 0.4)'
  )
  return (
    <NextChakraLink
      key={race.sys.id}
      href={`/races/${race.fields.slug}`}
      style={{ textDecoration: 'none' }}
    >
      <motion.div layout layoutId={`image-${race.sys.id}`}>
        <Box
          py={4}
          px={8}
          my={4}
          position="relative"
          rounded="lg"
          overflow="hidden"
          transition="transform 0.2s ease"
          _hover={{ transform: 'scale(1.025)' }}
        >
          <Box
            position="absolute"
            top={-10}
            left={-10}
            right={-10}
            bottom={-10}
            background={`linear-gradient(${imageOverlay},${imageOverlay}), url(${race.fields.image.fields.file.url})`}
            backgroundColor="rgb(160, 174, 192)"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            zIndex={-10}
            style={{ filter: 'blur(8px)' }}
          ></Box>
          <motion.div layout layoutId={`heading-${race.sys.id}`}>
            <Heading as="h2" size="md">
              {race.fields.title}
            </Heading>
          </motion.div>
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
                  delay: 0.3 + listIndex * 0.1,
                  duration: 0.2,
                },
              },
            }}
          >
            <Text>
              {formatDate({ dateTime: race.fields.date })} (in{' '}
              {timeTo({ dateTime: race.fields.date })})
            </Text>
          </motion.div>
        </Box>
      </motion.div>
    </NextChakraLink>
  )
}
