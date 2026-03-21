"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { signUpAction } from "@/app/sign-up/sign-up-action";
import { LoginState } from "@/types/login";
import styles from "./page.module.css";

const SignUp = () => {
  const [{ error, redirectTo }, formAction, isPending] = useActionState<
    LoginState,
    FormData
  >(signUpAction, {
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
        <h1 className={styles.authTitle}>Регистрация</h1>
        <p className={styles.authSubtitle}>
          Придумайте логин и пароль для нового аккаунта.
        </p>
        <form className={styles.form} action={formAction}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="signup-login">
              Логин
            </label>
            <input
              className={styles.input}
              id="signup-login"
              name="login"
              type="text"
              autoComplete="username"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="signup-password">
              Пароль
            </label>
            <input
              className={styles.input}
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button
            className={styles.submit}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Регистрация…" : "Зарегистрироваться"}
          </button>
        </form>
        <p className={styles.footer}>
          Уже есть аккаунт?{" "}
          <Link className={styles.footerLink} href="/login">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
