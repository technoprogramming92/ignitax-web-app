// src/pages/api/posts/[slug].ts
import type { APIRoute } from "astro";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";
// IMPORTANT: Add authentication checks for PUT & DELETE later!
// import { isUserAuthenticated } from '../../../lib/auth';

// GET /api/posts/:slug - Fetch a single post by slug
export const GET: APIRoute = async ({ params, request }) => {
  const slug = params.slug;
  if (!slug)
    return new Response(
      JSON.stringify({ success: false, message: "Slug parameter is required" }),
      { status: 400 }
    );

  try {
    await dbConnect();
    const post = await Post.findOne({ slug: slug }); // Find by unique slug

    if (!post) {
      return new Response(
        JSON.stringify({ success: false, message: "Post not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: post }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(`API Error GET /api/posts/${slug}:`, error);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error fetching post" }),
      { status: 500 }
    );
  }
};

// PUT /api/posts/:slug - Update a post (NEEDS AUTHENTICATION)
export const PUT: APIRoute = async ({ params, request }) => {
  // --- Authentication Check ---
  // const isAuthenticated = await isUserAuthenticated(request);
  // if (!isAuthenticated) {
  //   return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401 });
  // }
  // ---

  const slug = params.slug;
  if (!slug)
    return new Response(
      JSON.stringify({ success: false, message: "Slug parameter is required" }),
      { status: 400 }
    );

  try {
    await dbConnect();
    const body = await request.json();

    // Find the post and update it
    // Add slug validation/update logic carefully if slugs can change
    const updatedPost = await Post.findOneAndUpdate(
      { slug: slug },
      body, // Pass the entire body for update (ensure only allowed fields are sent from client)
      {
        new: true, // Return the modified document
        runValidators: true, // Re-run schema validation on update
      }
    );

    if (!updatedPost) {
      return new Response(
        JSON.stringify({ success: false, message: "Post not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: updatedPost }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(`API Error PUT /api/posts/${slug}:`, error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return new Response(
        JSON.stringify({
          success: false,
          message: "Validation Error",
          errors: messages,
        }),
        { status: 400 }
      );
    }
    if (error.code === 11000) {
      // Handle potential duplicate slug on update
      return new Response(
        JSON.stringify({
          success: false,
          message: "Another post with the updated slug already exists.",
        }),
        { status: 409 }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: "Server Error updating post" }),
      { status: 500 }
    );
  }
};

// DELETE /api/posts/:slug - Delete a post (NEEDS AUTHENTICATION)
export const DELETE: APIRoute = async ({ params, request }) => {
  // --- Authentication Check ---
  // const isAuthenticated = await isUserAuthenticated(request);
  // if (!isAuthenticated) {
  //   return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401 });
  // }
  // ---

  const slug = params.slug;
  if (!slug)
    return new Response(
      JSON.stringify({ success: false, message: "Slug parameter is required" }),
      { status: 400 }
    );

  try {
    await dbConnect();
    const deletedPost = await Post.findOneAndDelete({ slug: slug });

    if (!deletedPost) {
      return new Response(
        JSON.stringify({ success: false, message: "Post not found" }),
        { status: 404 }
      );
    }

    return new Response(null, { status: 204 }); // 204 No Content
  } catch (error: any) {
    console.error(`API Error DELETE /api/posts/${slug}:`, error);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error deleting post" }),
      { status: 500 }
    );
  }
};
