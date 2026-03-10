import { getGlobalData  } from '../../utils/global-data';
import { getPosts } from '../../utils/mdx-utils';

import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomImage from '../../components/CustomImage';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';


export default function CategoryPage({
  posts, category, categories, globalData
}) {
  return (
    <Layout>
      <SEO title={globalData.name} description={category} />
      <Header name={globalData.name} categories={categories} />
      <article className="px-6 md:px-0">
        {/* <header>
          <h1 className="mb-12 text-3xl text-center md:text-5xl dark:text-white">
            {frontMatter.title}
          </h1>
          {frontMatter.description && (
            <p className="mb-4 text-xl">
              {frontMatter.description}
            </p>
          )}
        </header> */}
        <main>
             <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="transition border border-b-0 bg-white/10 border-gray-800/10 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10 last:border-b"
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
                className="block px-6 py-6 lg:py-10 lg:px-16 focus:outline-hidden focus:ring-4 focus:ring-primary/50"
              >
                {post.data.date && (
                  <p className="mb-3 font-bold uppercase opacity-60">
                    {post.data.date}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl">
                  {post.data.title}
                </h2>
                {post.data.description && (
                  <p className="mt-3 text-lg opacity-60">
                    {post.data.description}
                  </p>
                )}
                <ArrowIcon className="mt-4" />
              </Link>
            </li>
          ))}
        </ul>
        </main>
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const allPosts = getPosts();
  const globalData = getGlobalData();
  
  // Get unique categories for the Nav
  const categories = [...new Set(allPosts.map(p => p.data.category).filter(Boolean))];
  
  // Filter posts for this specific category page
  const filteredPosts = allPosts.filter(
    (p) => p.data.category?.toLowerCase() === params.slug.toLowerCase()
  );

  return { props: { posts: filteredPosts, category: params.slug, categories, globalData } };
};

export const getStaticPaths = async () => {
  const posts = getPosts();
  const categories = [...new Set(posts.map(p => p.data.category).filter(Boolean))];
  const paths = categories.map((cat) => ({ params: { slug: cat.toLowerCase() } }));
  return { paths, fallback: false };
};

