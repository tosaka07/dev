import { fetchBooks, fetchOpenBD } from '../interfaces/services/book_service'
import postsByMonthList from './blog/_posts2';
import Global = NodeJS.Global;

// Fetch 使うため
export interface GlobalWithCognitoFix extends Global {
  fetch: any
}
declare const global: GlobalWithCognitoFix;
global.fetch = require('node-fetch').default;

interface Pair {
  post: any
  api?: any
}

export async function get(req, res, next) {
  const books = await fetchBooks(10)
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

  const response = {
    blogs: postsByMonthList.slice(0, 10),
    books: pairs
  }

  res.end(JSON.stringify(response));
}