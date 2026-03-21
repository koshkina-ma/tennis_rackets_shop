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
        <h1 className={styles.authTitle}>Вход</h1>
        <p className={styles.authSubtitle}>
          Введите логин и пароль, чтобы продолжить.
        </p>
        <form className={styles.form} action={formAction}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login">
              Логин
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
              Пароль
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
            {isPending ? "Вход…" : "Войти"}
          </button>
        </form>
        <p className={styles.footer}>
          Нет аккаунта?{" "}
          <Link className={styles.footerLink} href="/sign-up">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
