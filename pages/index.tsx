import { GetStaticProps } from 'next'
import { getEntries } from '../lib/api'
import {
  IRace,
  IRaceFields,
  ILayout,
  ILayoutFields,
} from '../@types/generated/contentful'
import { Heading } from '@chakra-ui/core'
import Markdown from 'react-markdown'
import renderers from '../utils/md_renderers'
import { Layout } from '../components/Layout'
import { RaceTile } from '../components/RaceTile'

export const getStaticProps: GetStaticProps = async () => {
  const races = await getEntries<IRaceFields>({
    type: 'race',
    'fields.date[gte]': new Date().toISOString(),
    order: 'fields.date',
  })

  const layout = await getEntries<ILayoutFields>({
    type: 'layout',
    limit: 1,
  }).then((items) => items[0])

  return {
    props: {
      races,
      layout,
    },
  }
}

export interface HomeProps {
  races: IRace[]
  layout: ILayout
}

export const Home = ({ races, layout }: HomeProps): JSX.Element => {
  return (
    <Layout layout={layout}>
      <Heading as="h2" size="md" mt="8">
        {layout.fields.upcomingRunsHeading}
      </Heading>
      {races.map((race, index) => (
        <RaceTile key={race.sys.id} listIndex={index} race={race} />
      ))}
      <Heading as="h2" size="md" mt="8">
        {layout.fields.descriptionHeading}
      </Heading>
      <Markdown source={layout.fields.description} renderers={renderers} />
    </Layout>
  )
}
export default Home
