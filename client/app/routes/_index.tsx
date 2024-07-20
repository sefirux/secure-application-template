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
  return authenticator.isAuthenticated(request);
}

export default function Index() {
  const user = useLoaderData<typeof loader>();

  let display;

  if (user) {
    display = (
      <div>
        <p>Sign-out loco</p>
        <p>{user.preferred_username}</p>
        <p>{user.email}</p>
        <Link to="/auth/logout">
          <button className="border rounded-md p-1 bg-indigo-600 text-white">
            Logout
          </button>
        </Link>
        <Link to="/protected">
          <button className="border rounded-md p-1 bg-indigo-600 text-white">
            Go to protected
          </button>
        </Link>
      </div>
    );
  } else {
    display = (
      <div>
        <p>Sign-in loco</p>
        <Link to="/auth/keycloak/callback">
          <button className="border rounded-md p-1 bg-indigo-600 text-white">
            Sign-in
          </button>
        </Link>
        <Link to="/protected">
          <button className="border rounded-md p-1 bg-indigo-600 text-white">
            Go to protected
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <div className="py-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          {display}
        </div>
      </div>
    </div>
  );
}
