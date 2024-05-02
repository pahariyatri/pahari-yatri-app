import siteMetadata from "@/data/siteMetadata"
import { Metadata } from "next"



// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string[] }
// }): Promise<Metadata | undefined> {
//   const slug = decodeURI(params.slug.join('/'))


//   const ogImages = imageList.map((img) => {
//     return {
//       url: img.includes('http') ? img : siteMetadata.siteUrl + img,
//     }
//   })

//   return {
//     title: post.title,
//     description: post.summary,
//     openGraph: {
//       title: post.title,
//       description: post.summary,
//       siteName: siteMetadata.title,
//       locale: 'en_US',
//       type: 'article',
//       publishedTime: publishedAt,
//       modifiedTime: modifiedAt,
//       url: './',
//       images: ogImages,
//       authors: authors.length > 0 ? authors : [siteMetadata.author],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: post.title,
//       description: post.summary,
//       images: imageList,
//     },
//   }
// }



export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))

  // const jsonLd = post.structuredData
  // jsonLd['author'] = authorDetails.map((author) => {
  //   return {
  //     '@type': 'Person',
  //     name: author.name,
  //   }
  // })

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      {/* <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout> */}
    </>
  )
}
