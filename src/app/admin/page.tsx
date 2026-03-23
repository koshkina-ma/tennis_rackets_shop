"use client";

import { use } from "react";
import { UserContext } from "../providers/user-provider";
import { redirect } from "next/navigation";

const Admin = () => {
  const { user } = use(UserContext);

  if (!user?.isAdmin) {
    redirect("/403");
  }

  return <div>admin page</div>;
};

export default Admin;
