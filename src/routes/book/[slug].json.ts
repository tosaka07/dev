import { fetchBook, fetchOpenBD } from '../../interfaces/services/book_service'

export async function get(req, res, next) {

  const { slug } = req.params;

  const book = await fetchBook(slug)
  const openBD = await fetchOpenBD(`${book.isbn}`)

  const data = {
    post: { ...book, localizedReadAt: book.readAt.toLocaleDateString() },
    api: openBD[0]
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(data));
}