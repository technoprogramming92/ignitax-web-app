// src/pages/api/posts/index.ts
import type { APIRoute } from "astro";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";
// IMPORTANT: Add authentication checks for POST later!
// import { isUserAuthenticated } from '../../../lib/auth';

// --- GET Request Handler (Modified for Pagination) ---
export const GET: APIRoute = async ({ url }) => {
  // Destructure url from context
  try {
    await dbConnect();

    // --- Pagination Parameters ---
    const pageParam = url.searchParams.get("page");
    const limitParam = url.searchParams.get("limit");

    const page =
      pageParam && parseInt(pageParam, 10) > 0 ? parseInt(pageParam, 10) : 1;
    const limit =
      limitParam && parseInt(limitParam, 10) > 0 ? parseInt(limitParam, 10) : 9; // Default limit (e.g., 9 for 3x3 grid)
    const skip = (page - 1) * limit;
    // ---

    // --- Fetch Paginated Posts and Total Count ---
    // Use Promise.all to run queries concurrently
    const [posts, totalPosts] = await Promise.all([
      Post.find({})
        .select("title slug excerpt coverImageUrl createdAt") // Keep selecting necessary fields
        .sort({ createdAt: -1 }) // Sort by creation date
        .skip(skip) // Skip documents for previous pages
        .limit(limit), // Limit documents per page
      Post.countDocuments({}), // Get the total number of posts
    ]);
    // ---

    const totalPages = Math.ceil(totalPosts / limit);

    // --- Construct Response ---
    const responseData = {
      success: true,
      data: {
        posts: posts, // The array of posts for the current page
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalPosts: totalPosts,
          limit: limit,
        },
      },
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("API Error GET /api/posts:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server Error fetching posts",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// --- POST Request Handler (Remains the same) ---
export const POST: APIRoute = async ({ request }) => {
  // --- Authentication Check ---
  // const isAuthenticated = await isUserAuthenticated(request);
  // if (!isAuthenticated) {
  //   return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401 });
  // }
  // ---

  try {
    await dbConnect();
    const body = await request.json();

    // Add Server-Side Slug Generation/Validation Here if needed

    const newPost = new Post(body);
    const savedPost = await newPost.save();

    return new Response(JSON.stringify({ success: true, data: savedPost }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("API Error POST /api/posts:", error);
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
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (error.code === 11000) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "A post with this slug already exists.",
        }),
        {
          status: 409, // Conflict
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: "Server Error creating post" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
