// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export interface ILayoutFields {
  /** Title */
  title: string

  /** Description */
  description: string
}

export interface ILayout extends Entry<ILayoutFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'layout'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IRaceFields {
  /** Title */
  title: string

  /** slug */
  slug?: string | undefined

  /** Description */
  description: string

  /** Date */
  date: string

  /** Duration */
  duration: number

  /** Location */
  location?: { lat: number; lon: number } | undefined

  /** Image */
  image: Asset
}

export interface IRace extends Entry<IRaceFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'race'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export type CONTENT_TYPE = 'layout' | 'race'

export type LOCALE_CODE = 'en-US' | 'sv'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US'
