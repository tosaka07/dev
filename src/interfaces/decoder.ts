import { Book, Tag } from './constant'
import fns from 'date-fns'

interface Decoder<T> {
  from(data: any): T
}

export const bookDecoder: Decoder<Book> = {
  from: (data: any): Book => {
    return {
      id: data.sys.id,
      slug: data.fields.slug,
      isbn: data.fields.isbn,
      readAt: new Date(data.fields.readAt),
      thought: data.fields.thought,
      rating: data.fields.rating,
      tags: data.fields.tags.map(tagDecoder.from)
    }
  }
}

export const tagDecoder: Decoder<Tag> = {
  from: (data: any) : Tag => {
    return {
      id: data.sys.id,
      slug: data.fields.slug,
      name: data.fields.name
    }
  }
}