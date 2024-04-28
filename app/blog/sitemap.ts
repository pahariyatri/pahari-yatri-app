import { BASE_URL } from '@/app/lib/constants'
import { MetadataRoute } from 'next'

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }]
}

const blogs = [
  {
    id: 1,
    date: new Date(),
  }
]
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const start = id * 50000
  const end = start + 50000
  // const products = await getProducts(
  //   `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`
  // )

  return blogs.map((blog: { id: number; date: any }) => ({
    url: `${BASE_URL}/blog/${blog.id}`,
    lastModified: blog.date,
  }))
}