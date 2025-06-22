import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

export class DatabaseService {
  client = new Client();
  database;
  bucket; // bucket is used to store image and the url of the image is stored in the database.

  constructor() {
    this.client.setEndpoint(config.endPoint).setProject(config.projectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // create a document in database. database->collection->document(post). All data's are stored in document
  async createPost({ title,postId, content, imageId, status, userId }) {
    if(!imageId) imageId = null; // if imageId is not provided, set it to null
    try{
      return await this.database.createDocument(
        config.databaseId,
        config.collectionId,
        ID.unique(),
        {
          title,
          content,
          imageId,
          status,
          userId,
        }
      );
    } catch (error) {
      return error
    }
  }

  // update a document in database
  async updatePost(postId, { title, content, imageId, status, userId }) {
    if(!imageId) imageId = null; // if imageId is not provided, set it to null
    try {
      return await this.database.updateDocument(
        config.databaseId,
        config.collectionId,
        postId, //document id
        {
          title,
          content,
          imageId,
          status,
          userId,
        }
      );
    } catch (error) {
      return error
    }
  }

  // deleted a document in database
  async deletePost(postId) {
    try {
      await this.database.deleteDocument(
        config.databaseId,
        config.collectionId,
        postId
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  // get a particular document in database
  async getPost(postId) {
    try {
      return await this.database.getDocument(
        config.databaseId,
        config.collectionId,
        postId
      );
    } catch (error) {
      return error
    }
  }

  // get list of documents in database
  async getAllPost(userId) {
    try {
      return await this.database.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.and([
            Query.equal("userId",[userId]),
            Query.equal("status", ["active"])
          ])
        ]
      );
    } catch (error) {
      return false; // for no values found
    }
  }

  // Bucket configuration/service 
  // Database saves the link of the file, not the file itself. The link is obtained from the bucket. The bucket stores the file and returns the link to it on calling the bucket.

  // upload file (in bucket)
  async uploadFile(file) {
    try {
      const uploadedFile=await this.bucket.createFile(config.buckedId, ID.unique(), file);
    } catch (error) {
      return error
    }
  }

  // delete file (in bucket)
  async deleteFile(fileId) {
    try {
        await this.bucket.deleteFile(config.buckedId, fileId);
        return true
    } catch (error) {
      return false
    }
  }

  // get file preview (of bucket)
  getFilePreview(fileId){
    try {
        return this.bucket.getFileView(
            config.buckedId,
            fileId
        )
    } catch (error) {
      return error
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
