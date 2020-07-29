import { client } from '../api_client'
import { ContentType, getEntriesParametor, Book, getEntriesParametorWithSlug } from '../constant'
import { bookDecoder } from '../decoder'

import Global = NodeJS.Global;
export interface GlobalWithCognitoFix extends Global {
    fetch: any
}
declare const global: GlobalWithCognitoFix;
global.fetch = require('node-fetch').default;

export const fetchBooks = async (limit?: number): Promise<Book[]> => {
  const limitObj = (limit != null) ? { limit: limit! } : {}
  const params = { ...getEntriesParametor(ContentType.Book), ...limitObj }
  const response = await client.getEntries(params)
  console.log(response.items)
  return response.items.map(bookDecoder.from)
}

export const fetchBook = async (slug: string): Promise<Book> => {
  const params = getEntriesParametorWithSlug(ContentType.Book, slug)
  const response = await client.getEntries(params)
  return response.items.map(bookDecoder.from)[0]
}

export const fetchOpenBD = async (isbn: string): Promise<any> => {
  const response = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`)
  return await response.json()
}