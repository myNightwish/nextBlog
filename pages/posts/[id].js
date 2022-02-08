import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
// Add this line to imports
import Date from '../../components/date'
// Add this line
import utilStyles from '../../styles/utils.module.css'

// export default function Post({ postData }) {
//     return (
//       <Layout>
//         {postData.title}
//         <br />
//         {postData.id}
//         <br />
//         {postData.date}
//       </Layout>
//     )
//   }

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      </Layout>
    )
  }

export async function getStaticPaths() {
    const paths = getAllPostIds()
    console.log(paths);
    return {
      paths,
      fallback: false
    }
}


// export async function getStaticProps({ params }) {
//     const postData = getPostData(params.id)
//     return {
//       props: {
//         postData
//       }
//     }
//   }

  export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }