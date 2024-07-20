import { Authenticator } from "remix-auth";
import oauthStrategy, { OAuth2Payload } from "./oauth.server";
import { sessionStorage } from "./session.server";

export const authenticator = new Authenticator<OAuth2Payload>(sessionStorage);

authenticator.use(oauthStrategy, "keycloak");
