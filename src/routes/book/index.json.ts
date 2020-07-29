import { fetchBooks, fetchOpenBD } from '../../interfaces/services/book_service'

export async function get(req, res, next) {

  const books = await fetchBooks()
  const promises = books
    .map(post => {
      return fetchOpenBD(`${post.isbn}`)
        .then(json => { 
          return {
            post: { ...post, localizedReadAt: post.readAt.toLocaleDateString() },
            api: json[0]
          }  
        })
    })
    
  const pairs = await Promise.all(promises)

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(pairs));
}