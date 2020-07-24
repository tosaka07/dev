import posts from '../book/_posts';
import format from 'date-fns/format'
import Global = NodeJS.Global;
export interface GlobalWithCognitoFix extends Global {
    fetch: any
}
declare const global: GlobalWithCognitoFix;
global.fetch = require('node-fetch').default;

const lookup = new Map();
posts
	.forEach(post => {
		lookup.set(post.slug, post);
	});

export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const {
		slug
  } = req.params;

	if (lookup.has(slug)) {
    const response = await fetch(`https://api.openbd.jp/v1/get?isbn=${slug}`)
    if (response.ok) {
      const json = await response.json()

      const post = lookup.get(slug)

      const data = {
        post: { ...post, localizedReadDate: format(new Date(post.readDate), 'yyyy年MM月dd日') },
        api: json[0]
      }
  
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(data));
    } else {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      });
  
      res.end(JSON.stringify({
        message: `Not found`
      }));
    }
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}