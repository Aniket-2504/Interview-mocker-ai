/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mocker_owner:np0SelufcA2Q@ep-shy-base-a5j34ggs.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };