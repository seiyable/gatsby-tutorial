import React from "react";
import { graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import { rhythm } from '../utils/typography';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';

export default ({data}) => {
  console.log('data', data);
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8"/>
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example"/>
      </Helmet>
      <Layout>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>
          {data.allMarkdownRemark.totalCount} Posts
        </h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3
                css={css`
                  margin-bottom: ${rhythm(1/4)};
                `}
              >
                {node.frontmatter.title}{" "}
                <span
                  css={css`
                    color: #bbb;
                  `}
                >
                  - {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
        <div>
          <img
            src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
            alt="Group of pandas eating bamboo"
          />
        </div>
      </Layout>
    </div>
  );
};

export const query = graphql`
query {
  allMarkdownRemark(sort: {
    fields: [
      frontmatter___date
    ],
    order: DESC
  }) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
}`;