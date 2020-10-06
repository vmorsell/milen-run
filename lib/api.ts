import { createClient, Entry } from 'contentful'
import { CONTENT_TYPE } from '../@types/generated/contentful'

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export interface GetEntries {
  type: CONTENT_TYPE
  [key: string]: any
}
export const getEntries = async <T>({
  type,
  ...rest
}: GetEntries): Promise<Entry<T>[]> => {
  return client
    .getEntries<T>({ content_type: type, ...rest })
    .then((collection) => collection.items)
}

export interface GetEntry {
  type: CONTENT_TYPE
  slug: string
  [key: string]: any
}
export const getEntryBySlug = async <T>({
  type,
  slug,
  ...rest
}: GetEntry): Promise<Entry<T>> => {
  return client
    .getEntries<T>({
      content_type: type,
      'fields.slug[in]': slug,
      limit: 1,
      ...rest,
    })
    .then((collection) => collection.items[0])
}
