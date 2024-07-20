export interface ServerProperties {
  environment: "development" | "production" | "test";
  clientId: string;
  clientSecret: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  tokenRevocationEndpoint: string;
  logoutEndpoint: string;
  redirectURI: string;
  sessionSecret: string;
}

const properties: ServerProperties = {
  environment: process.env.NODE_ENV,
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  authorizationEndpoint: process.env.AUTHORIZATION_ENDPOINT!,
  tokenEndpoint: process.env.TOKEN_ENDPOINT!,
  tokenRevocationEndpoint: process.env.TOKEN_REVOCATION_ENDPOINT!,
  logoutEndpoint: process.env.LOGOUT_ENDPOINT!,
  redirectURI: process.env.REDIRECT_URI!,
  sessionSecret: process.env.SESSION_SECRET!,
};

export default properties;
