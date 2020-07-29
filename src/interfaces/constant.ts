export const ContentType = {
  Book: 'book',
  Tag: 'tag'
}

export const getEntriesParametor = (type: string): any => {
  return {
    content_type: type
  }
}

export const getEntriesParametorWithSlug = (type: string, slug: string) => {
  return {
    ...getEntriesParametor(type),
    'fields.slug': slug,
    limit: 1
  }
}

export interface Tag {
  id: string
  slug: string
  name: string
}

export interface Book {
  id: string
  slug: string
  isbn: number
  readAt: Date
  thought?: string
  rating: number
  tags: Tag[]
}