import { claim_space } from "svelte/internal"

const fs = require('fs')
const path = require('path')
// const prism = require('prismjs')
const marked = require('marked')
const matter = require('gray-matter')
const formatDate = require('date-fns/format')

const cwd = process.cwd()
const POSTS_DIR = path.join(cwd, 'docs/blogs')
const EXCERPT_SEPARATOR = '<!-- more -->'
const renderer = new marked.Renderer()
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text)

    if (href.indexOf('/') === 0) {
      // Do not open internal links on new tab
      return html
    } else if (href.indexOf('#') === 0) {
      // Handle hash links to internal elements
      const html = linkRenderer.call(renderer, 'javascript:;', title, text)
      return html.replace(/^<a /, `<a onclick="document.location.hash='${href.substr(1)}';" `)
    }

    return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ')
}

const posts = fs.readdirSync(POSTS_DIR)
  .filter(fileName => /\.md$/.test(fileName))
  .map(fileName => {
    const fileMd = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf8')
    const { data, content: rawContent } = matter(fileMd)
    const { title, date, image, hero, tags } = data
    const slug = fileName.split('.')[0]
    let content = rawContent
    let excerpt = ''

    if (rawContent.indexOf(EXCERPT_SEPARATOR) !== -1) {
      const splittedContent = rawContent.split(EXCERPT_SEPARATOR)
      excerpt = splittedContent[0]
      content = splittedContent[1]
    }

    const html = marked(content)
    const printDate = formatDate(new Date(date), 'yyyy-MM-dd')

    return {
      title: title || slug,
      slug,
      html,
      date,
      image,
      hero,
      tags,
      excerpt,
      printDate,
    }
  })

posts.sort((a, b) => {
  const dateA = new Date(a.date)
  const dateB = new Date(b.date)

  if (dateA > dateB) return -1
  if (dateA < dateB) return 1
  return 0
})

interface PostsByMonth {
  key: string
  posts: any[]
}

let postsByMonthList: PostsByMonth[] = []

posts.forEach(post => {
  let key = formatDate(new Date(post.date), 'yyyy-MM')
  post.html = post.html.replace(/^\t{3}/gm, '')
  const postsByMonth = postsByMonthList.filter(arg => { arg.key == key})[0]

  if (postsByMonth == undefined) {
    postsByMonthList.push({ key: key, posts: [post] })
  } else {
    postsByMonth.posts.push(post)
  }
})

export default postsByMonthList