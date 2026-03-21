"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { loginAction } from "./login-action";
import { LoginState } from "@/types/login";
import styles from "./page.module.css";

const Login = () => {
  const [{ error, redirectTo }, formAction, isPending] = useActionState<
    LoginState,
    FormData
  >(loginAction, {
    error: "",
    redirectTo: "",
  });

  useEffect(() => {
    if (redirectTo) {
      location.assign(redirectTo);
    }
  }, [redirectTo]);

  return (
    <div className={styles.authWrap}>
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>Sign in</h1>
        <p className={styles.authSubtitle}>
          Enter your login and password to continue.
        </p>
        <form className={styles.form} action={formAction}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login">
              Login
            </label>
            <input
              className={styles.input}
              id="login"
              name="login"
              type="text"
              autoComplete="username"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          {error ? <p className={styles.error}>{error}</p> : null}
          <button className={styles.submit} type="submit" disabled={isPending}>
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className={styles.footer}>
          No account?{" "}
          <Link className={styles.footerLink} href="/sign-up">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
