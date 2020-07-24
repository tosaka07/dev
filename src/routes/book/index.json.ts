import posts from '../book/_posts';
import Global = NodeJS.Global;
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

  const fetchOpenBD = async (isbn: string) => {
    const response = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`)
    return await response.json()
  }

  const promises = posts
    .map(post => {
      return fetchOpenBD(post.isbn)
        .then(json => { return { "post": post, "api": json[0] }  })
    })
    
  const pairs = await Promise.all(promises)

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(pairs));
}