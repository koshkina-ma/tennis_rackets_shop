"use client";

import { UserContext } from "@/providers/user";
import { FC, use, useTransition } from "react";
import { Link } from "../link/link";
import { BASE_API_URL } from "@/constants/api";
import classNames from "classnames";

const handleLogout = async () => {
  await fetch(`${BASE_API_URL}/auth/logout`, {
    credentials: "include",
    method: "DELETE",
  });

  location.assign("/");
};

import styles from "./user-section.module.css";

interface Props {
  className: string;
}

export const UserSection: FC<Props> = ({ className }) => {
  const { isAuthorized } = use(UserContext);

  const [isPending, startTransition] = useTransition();

  return (
    <div className={classNames(className, styles.root)}>
      {isAuthorized ? (
        <button
          disabled={isPending}
          onClick={() => startTransition(handleLogout)}
        >
          Logout
        </button>
      ) : (
        <>
          <Link href='/sign-in'>Login</Link>
          <Link href='/sign-up'>Sign Up</Link>
        </>
      )}
    </div>
  );
};