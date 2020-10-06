import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { Entry } from 'contentful'
import { IRaceFields } from '../../@types/generated/contentful'
import { getEntries, getEntryBySlug } from '../../lib/api'

export const getStaticPaths: GetStaticPaths = async () => {
  const races = await getEntries<IRaceFields>({
    type: 'race',
  })

  return {
    paths: races?.map((race) => `/races/${race.fields.slug}`) ?? [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (params: any) => {
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
  race: Entry<IRaceFields>
}
export const Race = ({ race }: RaceProps): JSX.Element => {
  return (
    <div className="container">
      <Head>
        <title>{race.fields.title}</title>
      </Head>

      <main>
        <p>{race.fields.title}</p>
      </main>
    </div>
  )
}

export default Race
