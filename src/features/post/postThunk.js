import databaseService from "../../appwrite/databaseConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// function for creating post
export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ data, userData, postId }, { rejectWithValue }) => {
    try {
      const userId = userData.$id;
      let imageId = null;

      // If image is provided, upload it first
      if (data.image && data.image[0]) {
        const returnValue = await databaseService.uploadFile(data.image);
        imageId = returnValue?.$id || null;
      }

      // Create the post
      const createdPostInfo = await databaseService.createPost({
        ...data,
        userId,
        postId,
        ...(imageId && { imageId }),
      });

      if (!createdPostInfo) {
        return rejectWithValue("Failed to create post");
      }

      return {
        postId: createdPostInfo.$id,
        title: createdPostInfo.title,
        content: createdPostInfo.content,
        status: createdPostInfo.status,
        userId: createdPostInfo.userId,
        imageUrl: createdPostInfo.imageId
          ? databaseService.getFileUrl(createdPostInfo.imageId)
          : null,
        createdAt: createdPostInfo.$createdAt,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//function for updating post
export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ prevImageId, data, postId }, { rejectWithValue }) => {
    try {
      let imageId = prevImageId || null;

      // If a new image is provided, upload it and delete the old one
      if (data.image && data.image[0]) {
        const updatedImage = await databaseService.uploadFile(data.image[0]);
        if (updatedImage && prevImageId) {
          await databaseService.deleteFile(prevImageId);
        }
        imageId = updatedImage?.$id || prevImageId || null;
      }

      // Update the post
      const updatedPost = await databaseService.updatePost(postId, {
        ...data,
        imageId:imageId,
      });

      // Return the updated post data (or whatever you need)
      return {
        postId: updatedPost.$id,
        title: updatedPost.title,
        content: updatedPost.content,
        status: updatedPost.status,
        userId: updatedPost.userId,
        imageUrl: updatedPost.imageId
          ? databaseService.getFileUrl(updatedPost.imageId)
          : null,
        updatedAt: updatedPost.$updatedAt,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);