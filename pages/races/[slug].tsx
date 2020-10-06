import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { IRace, IRaceFields } from '../../@types/generated/contentful'
import { getEntries, getEntryBySlug } from '../../lib/api'

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
