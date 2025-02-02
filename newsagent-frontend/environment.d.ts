declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    API_HOST: string;
    // Add other environment variables here
  }
}
