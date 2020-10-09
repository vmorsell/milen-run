import { GetStaticProps } from 'next'
import { getEntries } from '../lib/api'
import { IRace, IRaceFields } from '../@types/generated/contentful'
import { Heading, Text } from '@chakra-ui/core'
import { Layout } from '../components/Layout'
import { RaceTile } from '../components/RaceTile'

export const getStaticProps: GetStaticProps = async () => {
  const races = await getEntries<IRaceFields>({
    type: 'race',
    order: 'fields.date',
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

export const Home = ({ races }: HomeProps): JSX.Element => {
  return (
    <Layout>
      {races.map((race, index) => (
        <RaceTile key={race.sys.id} listIndex={index} race={race} />
      ))}
      <Heading as="h2" size="md" mt="8">
        Who dis?
      </Heading>
      <Text my={4}>
        Milen med Mörsell is a friendly 10 km run on Kungsholmen for students in
        iSpexet at KTH and other cool cats who can't get enough running by
        themselves.
      </Text>
      <Text my={4}>
        We run together in a slow pace. Everyone is welcome, no previous
        experience of long distance running necessary.
      </Text>
    </Layout>
  )
}
export default Home
