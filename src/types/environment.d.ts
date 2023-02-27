declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT:string;
      DB_URL: string;

    }
  }
}

export { };