import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { Heading, Text } from '@chakra-ui/core'
import { AspectRatio, Box, HStack } from '@chakra-ui/layout'
import { IRace, IRaceFields } from '../../@types/generated/contentful'
import { getEntries, getEntryBySlug } from '../../lib/api'
import { Layout } from '../../components/Layout'
import { rfcToReadable } from '../../utils/date'

export const getStaticPaths: GetStaticPaths = async () => {
  const races = await getEntries<IRaceFields>({
    type: 'race',
  })

  const paths = races.map((r) => {
    return {
      params: {
        slug: r.fields.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export interface RaceStaticPropsParams {
  params: {
    slug: string
  }
}
export const getStaticProps: GetStaticProps = async ({
  params,
}: RaceStaticPropsParams) => {
  const race = await getEntryBySlug<IRaceFields>({
    type: 'race',
    slug: params.slug,
  })

  return {
    props: {
      race,
    },
  }
}

export interface RaceProps {
  race: IRace
}
export const Race = ({ race }: RaceProps): JSX.Element => {
  return (
    <Layout
      title={race.fields.title}
      imageUrl={race.fields.image.fields.file.url}
      pageId={race.sys.id}
    >
      <Head>
        <title>{race.fields.title}</title>
      </Head>
      <main>
        <HStack my={6} alignItems="flex-start">
          <Box flex="1">
            <Text fontSize="sm">When?</Text>
            <Text fontSize="xl" fontWeight="bold">
              {rfcToReadable(race.fields.date)}
            </Text>
          </Box>
          <Box flex="1">
            <Text fontSize="sm">Where?</Text>
            <Text fontSize="xl" fontWeight="bold">
              Kungsholmen
            </Text>
          </Box>
          <Box flex="1">
            <Text fontSize="sm">For how long?</Text>
            <Text fontSize="xl" fontWeight="bold">
              ~{race.fields.duration} mins
            </Text>
          </Box>
        </HStack>
        {race.fields.description.split('\n\n').map((p, i) => (
          <Text key={i} my={4}>
            {p}
          </Text>
        ))}
        <Heading as="h2" size="md" my={8}>
          How do I get there?
        </Heading>
        <AspectRatio ratio={19 / 9} maxH="30vh">
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              race.fields.location.lon - 0.01
            }%2C${race.fields.location.lat - 0.01}%2C${
              race.fields.location.lon + 0.01
            }%2C${race.fields.location.lat + 0.01}&layer=hot`}
          ></iframe>
        </AspectRatio>
        <Heading as="h2" size="md" my={8}>
          You son of a bitch, I'm in!
        </Heading>
        <Text>Cool! Attend the event on Spexbook or send me a text.</Text>
      </main>
    </Layout>
  )
}

export default Race
