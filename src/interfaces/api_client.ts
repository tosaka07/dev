import contentful from 'contentful'
import dotenv from 'dotenv'

dotenv.config()

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})