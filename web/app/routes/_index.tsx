import type { MetaFunction } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const clientLoader = async () => {
  return redirect("/results");
}


export default function Index() {
  return (
    <div className="w-full sm:w-4/5 m-auto h-dvh">
      <Outlet />
    </div>
  );
}

