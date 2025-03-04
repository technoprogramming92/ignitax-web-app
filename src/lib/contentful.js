// src/lib/contentful.js
import { createClient } from "contentful";

// Create the Contentful client
export const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

// Get all blog posts
export async function getAllBlogPosts() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: "blog",
      //order: "-fields.publishDate",
    });

    if (!entries.items || entries.items.length === 0) {
      return [];
    }

    return entries.items
      .map((item) => {
        if (!item || !item.fields) {
          console.error("Invalid item structure:", item);
          return null;
        }
        return {
          ...item.fields,
          id: item.sys.id,
        };
      })
      .filter(Boolean); // Remove any null items
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug) {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: "blog",
      "fields.slug": slug,
      limit: 1,
    });

    if (!entries.items || entries.items.length === 0) {
      return null;
    }

    const post = entries.items[0];
    if (!post || !post.fields) {
      console.error("Invalid post structure:", post);
      return null;
    }

    return {
      ...post.fields,
      id: post.sys.id,
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}
