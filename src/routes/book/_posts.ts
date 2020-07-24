import * as fs from 'fs'
import * as path from 'path'
import marked from 'marked'
import matter from 'gray-matter'
import format from 'date-fns/format'

const cwd = process.cwd()
const POSTS_DIR = path.join(cwd, 'docs/books')
const renderer = new marked.Renderer()
const linkRenderer = renderer.link
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
    const { isbn, date, readDate } = data
    const slug = fileName.split('.')[0]
    let content = rawContent
    const html = marked(content)
    const formattedPublishDate = format(new Date(date), 'yyyy-MM-dd')
    const formattedReadDate = format(new Date(readDate), 'yyyy-MM-dd')

    return {
      isbn,
      slug,
      date,
      readDate,
      formattedPublishDate,
      formattedReadDate,
      html
    }
  })

posts.sort((a, b) => {
  const dateA = new Date(a.readDate)
  const dateB = new Date(b.readDate)

  if (dateA > dateB) return -1
  if (dateA < dateB) return 1
  return 0
})

export default posts