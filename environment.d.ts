declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_NETWORK_ID: string; // this is the line you want
        NODE_ENV: 'development' | 'production';
      }
    }
  }