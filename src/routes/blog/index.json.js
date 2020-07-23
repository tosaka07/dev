// import posts from './_posts.js';
import postsByMonthList from '../blog/_posts2';

const contents = JSON.stringify(postsByMonthList);

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(contents);
}