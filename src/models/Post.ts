// src/models/Post.ts
import mongoose from "mongoose"; // Use default import
const { Schema, model, models } = mongoose; // Destructure from the default import

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters."],
    },
    slug: {
      type: String,
      required: [true, "Slug is required."],
      unique: true, // Important for lookup
      trim: true,
      maxlength: [150, "Slug cannot exceed 150 characters."],
      // Basic validation for URL-safe characters
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be URL-friendly (lowercase letters, numbers, hyphens).",
      ],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [300, "Excerpt cannot exceed 300 characters."],
    },
    coverImageUrl: {
      // Field for the direct image URL
      type: String,
      trim: true,
      // Optional: Basic URL format validation
      match: [
        /^(http|https)?:\/\/[^\s$.?#].[^\s]*$/gm,
        "Cover image must be a valid URL.",
      ],
    },
    // Add author, tags, etc. later if needed
    // author: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Indexing for faster queries, especially for slugs
PostSchema.index({ slug: 1 });
PostSchema.index({ createdAt: -1 });

// Avoid redefining the model during hot-reloading
const Post = models.Post || model("Post", PostSchema);

export default Post;
