const config = {
  endPoint: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  buckedId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
