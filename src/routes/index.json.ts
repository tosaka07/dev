// import posts from './_posts.js';
import postsByMonthList from './blog/_posts2';
import posts from './book/_posts';
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
  // 本
  const fetchOpenBD = async (isbn: string) => {
    const response = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`)
    return await response.json()
  }
  const promises = posts.slice(0, 10)
    .map(post => {
      return fetchOpenBD(post.isbn)
        .then(json => { return { "post": post, "api": json[0] }  })
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