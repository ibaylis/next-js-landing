import Head from 'next/head'
import Layout from '../components/layout';
import path from 'path';

import marked from 'marked';

import matter from 'gray-matter';

import fs from 'fs';
import moment from 'moment';

import Link from "next/link";

export default function Home({posts}) {
  return (
    <Layout>      
      <Head>
        <title>Ian's Blog</title>
      </Head>
        {/* Banner */}
      <section id="banner" className="major">
        <div className="inner">
          <header className="major">
            <h1>Hi, my name is Forty</h1>
          </header>
          <div className="content">
            <p>A responsive site template designed by HTML5 UP<br />
              and released under the Creative Commons.</p>
            <ul className="actions">
              <li><Link href="#one" className="button next scrolly">Get Started</Link></li>
            </ul>
          </div>
        </div>
      </section>
      {/* Main */}
      <div id="main">
        {/* One */}
        <section id="one" className="tiles">

          {posts.map((post) => (
            <article>
              <span className="image">
                <img src={`/assets/images/${post.featured_image}`} alt="" />
              </span>
              <header className="major">
                <h3>
                  <a href={`/${post.slug}`} className="link">
                      {post.title}
                  </a>
                </h3>
                {/* */}
              </header>
            </article>

          ))}

        </section>
        {/* Two */}
        <section id="two">
          <div className="inner">
            <header className="major">
              <h2>Massa libero</h2>
            </header>
            <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
            <ul className="actions">
              <li><a href="landing.html" className="button next">Get Started</a></li>
            </ul>
          </div>
        </section>
      </div>
      {/* Contact */}
    </Layout>
  )
}

export const getStaticProps = async () => {
  {/* Look for the posts and sort by date */}
  const sortPosts = () => {
      {/* look in your directory and run a loop on each file name */}
    const allPosts = fs.readdirSync("posts").map((filename) => {
      {/* after you read the file convert the file to a string */}
      const file = fs.readFileSync(path.join("posts", filename)).toString();
      const postData = matter(file);
      return {
        content: postData.content,
        title: postData.data.title,
        featured_image: postData.data.featured_image,
        date: postData.data.date,
        slug: postData.data.slug
      };
    });
    return allPosts.sort(
      (a, b) =>
        new moment(a.date).format("YYYY-MM-DD HH:mn:ss") < new moment(b.date).format("YYYY-MM-DD HH:mn:ss"));
  }
  // console.log(fs.readdirSync("posts"));
  // sortPosts();


  return {
      props: {
          posts: sortPosts(),
      }
  }
}