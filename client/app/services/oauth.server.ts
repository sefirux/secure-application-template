import jwt, { JwtPayload } from "jsonwebtoken";
import { OAuth2Strategy, TokenResponseBody } from "remix-auth-oauth2";
import properties from "./properties.server";

export interface OAuth2Payload {
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

type OAuth2Token = TokenResponseBody & { id_token: string };

const oauthStrategy = new OAuth2Strategy<
  OAuth2Payload,
  { provider: "keycloak" },
  { id_token: string }
>(
  {
    clientId: properties.clientId,
    clientSecret: properties.clientSecret,
    authenticateWith: "request_body",
    authorizationEndpoint: properties.authorizationEndpoint,
    tokenEndpoint: properties.tokenEndpoint,
    tokenRevocationEndpoint: properties.tokenRevocationEndpoint,
    redirectURI: properties.redirectURI,
  },
  async ({ tokens }) => {
    // here you can use the params above to get the user and return it
    // what you do inside this and how you find the user is up to you
    return await getUser(tokens);
  }
);

export default oauthStrategy;

function getUser(tokens: OAuth2Token): OAuth2Payload {
  const payload = jwt.decode(tokens.access_token, {
    json: true,
  }) as JwtPayload;

  return {
    name: payload.name,
    preferred_username: payload.preferred_username,
    given_name: payload.given_name,
    family_name: payload.family_name,
    email: payload.email,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token!,
  };
}
