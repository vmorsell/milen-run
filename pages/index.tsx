import { GetStaticProps } from 'next'
import { getEntries } from '../lib/api'
import { IRace, IRaceFields } from '../@types/generated/contentful'
import { Heading, Text, Box } from '@chakra-ui/core'
import { NextChakraLink } from '../components/NextChakraLink'

export const getStaticProps: GetStaticProps = async () => {
  const races = await getEntries<IRaceFields>({
    type: 'race',
    order: '-fields.date',
  })

  return {
    props: {
      races,
    },
  }
}

export interface HomeProps {
  races: IRace[]
}

export const Home = ({ races }: HomeProps): JSX.Element => (
  <>
    {races.map((race) => (
      <Box key={race.sys.id} rounded="lg">
        <Heading as="h2">{race.fields.title}</Heading>
        <Text>{race.fields.description}</Text>
        <NextChakraLink href={`/races/${race.fields.slug}`}>
          Go to
        </NextChakraLink>
      </Box>
    ))}
  </>
)

export default Home
