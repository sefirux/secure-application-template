import { LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import properties from "~/services/properties.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    // redirect to main if no session found
    return redirect("/");
  }

  // close related session
  await fetch(properties.logoutEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: properties.clientId,
      client_secret: properties.clientSecret,
      refresh_token: user.refresh_token,
    }),
  });

  // delete local session
  await authenticator.logout(request, { redirectTo: "/" });
};
