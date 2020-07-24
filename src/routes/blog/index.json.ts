// import posts from './_posts.js';
import posts from './_posts2'
import format from 'date-fns/format'

interface PostsByMonth {
  key: string
  posts: any[]
}

let postsByMonthList: PostsByMonth[] = []

posts.forEach(post => {
  let key = format(new Date(post.date), 'yyyy-MM')
  post.html = post.html.replace(/^\t{3}/gm, '')
  const postsByMonth = postsByMonthList.filter(arg => { arg.key == key})[0]

  if (postsByMonth == undefined) {
    postsByMonthList.push({ key: key, posts: [post] })
  } else {
    postsByMonth.posts.push(post)
  }
})

const contents = JSON.stringify(postsByMonthList);

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(contents);
}