export declare global {
  interface User {
    id: string;
    username: string;
    displayName: string;
    email?: string;
    image?: string;
    deployments: Deployments[];
  }

  interface Deployments {
    id: number;
    url: string;
    userId: string;
  }
}
