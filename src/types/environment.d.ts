declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DB_PORT: string;
      DB_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      AWS_S3BUCKET_ACCESS_KEY_ID: string;
      AWS_S3BUCKET_SECRETACCESSK_KEY: string;
      AWS_REGION: string;
      AWS_BUCKET_NAME: string;
      OPEN_AI_API_KEY: string;
    }
  }
}

export {};
