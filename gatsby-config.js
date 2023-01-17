/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const DOCS_QUERY = `
  query {
    allMdx {
      nodes {
        slug
        meta: frontmatter {
          title
          description
        }
        headings(depth: h2) {
          value
        }
        excerpt
        rawBody
      }
    }
  }
`;

const queries = [
  {
    query: DOCS_QUERY,
    transformer: ({ data }) =>
      data.allMdx.nodes.map((item) => {
        const transformedNode = {
          objectID: item.slug,
          slug: item.slug,
          title: item.meta.title,
          description: item.meta.description,
          excerpt: item.excerpt,
          body: item.rawBody.replace(/(<([^>]+)>)/gi, ''),
        };

        return transformedNode;
      }),
    indexName: 'Docs',
    settings: {
      searchableAttributes: ['title', 'description', 'slug', 'excerpt', 'body'],
      indexLanguages: ['en'],
    },
    mergeSettings: false,
  },
];

module.exports = {
  siteMetadata: {
    title: `Jotai 为 React 提供原始且灵活的状态管理`,
    description: `Jotai 受 Recoil 启发的原子模型采用自下而上的方法来进行 React 状态管理。 可以通过组合原子来构建状态，并且渲染基于原子依赖性进行优化。 这解决了 React 上下文的额外重新渲染问题，并消除了对 memoization 技术的需要。`,
    siteUrl: `https://jotai.jscn.org`,
    shortName: `Jotai 中文文档`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `./docs`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      options: {
        classNameDark: 'dark',
        classNameLight: 'light',
        storageKey: 'darkMode',
        minify: true,
      },
    },
    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     queries,
    //     skipIndexing: process.env.ALGOLIA_SKIP_INDEXING,
    //   },
    // },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-WWJ8XD0QP0'],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
  ],
  flags: {
    DEV_SSR: false,
    QUERY_ON_DEMAND: true,
    LAZY_IMAGES: true,
    DEV_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
  },
  graphqlTypegen: false,
  jsxRuntime: 'automatic',
  polyfill: false,
  trailingSlash: 'never',
};
