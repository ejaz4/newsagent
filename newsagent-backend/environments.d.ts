declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    OPENAI_API_KEY: string;
    PORT: number;
    UI_HOST: string;
    // Add other environment variables here
  }
}
