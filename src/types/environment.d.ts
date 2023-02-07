declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT?: number;
      DB_URL: string;

    }
  }
}

export { };