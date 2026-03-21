"use client";

import { BASE_API_URL } from "@/constants/api";
import { UserContext } from "@/app/providers/user-provider";
import Link from "next/link";
import { FC, use, useTransition } from "react";
import styles from "./user-sections.module.css";

const logout = async () => {
  await fetch(`${BASE_API_URL}/auth/logout`, {
    credentials: "include",
    method: "DELETE",
  });
  location.assign("/");
};

type Props = {
  className?: string;
};

export const UserSection: FC<Props> = ({ className }) => {
  const { user } = use(UserContext);
  const [isPending, startTransition] = useTransition();
  const isAuthorized = user !== undefined;

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      {isAuthorized ? (
        <>
          <span className={styles.userName}>{user.login}</span>
          <button
            type="button"
            className={styles.logout}
            disabled={isPending}
            onClick={() => startTransition(() => void logout())}
          >
            {isPending ? "…" : "Выйти"}
          </button>
        </>
      ) : (
        <>
          <Link className={styles.link} href="/login">
            Войти
          </Link>
          <Link className={styles.link} href="/sign-up">
            Регистрация
          </Link>
        </>
      )}
    </div>
  );
};
