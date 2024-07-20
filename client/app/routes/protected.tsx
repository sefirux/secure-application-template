import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/auth/keycloak/callback",
  });
}

export default function Protected() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <div className="py-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <div>
            <p>Hello, this is a protected page</p>
            <hr />
            <p>{user.preferred_username}</p>
            <p>{user.email}</p>

            <Link to="/auth/logout">
              <button className="border rounded-md p-1 bg-indigo-600 text-white">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
