import { createCookieSessionStorage } from "@remix-run/node";
import properties from "./properties.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [properties.sessionSecret],
    secure: properties.environment === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
