import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { Heading, Text } from '@chakra-ui/core'
import { AspectRatio, Box, HStack } from '@chakra-ui/layout'
import Markdown from 'react-markdown'
import renderers from '../../utils/md_renderers'
import {
  IRace,
  IRaceFields,
  ILayout,
  ILayoutFields,
} from '../../@types/generated/contentful'
import { getEntries, getEntryBySlug } from '../../lib/api'
import { Layout } from '../../components/Layout'
import { formatDate } from '../../utils/date'

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

  const layout = await getEntries<ILayoutFields>({
    type: 'layout',
    limit: 1,
  }).then((items) => items[0])

  return {
    props: {
      race,
      layout,
    },
  }
}

export interface RaceProps {
  race: IRace
  layout: ILayout
}
export const Race = ({ race, layout }: RaceProps): JSX.Element => {
  return (
    <Layout
      backButtonLogotype
      layout={layout}
      title={race.fields.title}
      superTitle={race.fields.superTitle}
      imageUrl={race.fields.image.fields.file.url}
      pageId={race.sys.id}
    >
      <Head>
        <title>{race.fields.title}</title>
      </Head>
      <main>
        <HStack my={6} alignItems="flex-start">
          <Box flex="1">
            <Text fontSize="sm">{layout.fields.whenHeading}</Text>
            <Text fontSize="xl" fontWeight="bold">
              {formatDate({ dateTime: race.fields.date })}
            </Text>
          </Box>
          <Box flex="1">
            <Text fontSize="sm">{layout.fields.whereHeading}</Text>
            <Text fontSize="xl" fontWeight="bold">
              {race.fields.locationName}
            </Text>
          </Box>
          <Box flex="1">
            <Text fontSize="sm">{layout.fields.durationHeading}</Text>
            <Text fontSize="xl" fontWeight="bold">
              ~{race.fields.duration} mins
            </Text>
          </Box>
        </HStack>
        <Markdown source={race.fields.description} renderers={renderers} />
        <Markdown source={layout.fields.description} renderers={renderers} />
        <Heading as="h2" size="md" my={8}>
          {layout.fields.directionsHeading}
        </Heading>
        {race.fields.directions && (
          <Markdown source={race.fields.directions} renderers={renderers} />
        )}
        <AspectRatio ratio={19 / 9} maxH="30vh">
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              race.fields.location.lon - 0.01
            }%2C${race.fields.location.lat - 0.01}%2C${
              race.fields.location.lon + 0.01
            }%2C${race.fields.location.lat + 0.01}&layer=hot&marker=${
              race.fields.location.lat
            }%2C${race.fields.location.lon}`}
          ></iframe>
        </AspectRatio>
        <Heading as="h2" size="md" my={8}>
          {layout.fields.attendHeading}
        </Heading>
        <Markdown source={layout.fields.attendText} renderers={renderers} />
      </main>
    </Layout>
  )
}

export default Race
