"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "./login-action";
import { LoginState } from "@/types/login";

const Login = () => { //TODO удалила props, так как была ошибка, возможно понадобится позже
  const [{ error, redirectTo }, formAction, isPending] = useActionState<
    LoginState,
    FormData
  >(loginAction, {
    error: "",
  });

  useEffect(() => {
    if (redirectTo) {
      location.assign(redirectTo);
    }
  }, [redirectTo]);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor='login'>Login:</label>
        <input name='login' type='text' required />
      </div>

      <div>
        <label htmlFor='password'>Password:</label>
        <input name='password' type='password' required />
      </div>
      {error && <div>{error}</div>}
      <button disabled={isPending}>Login</button>
    </form>
  );
};

export default Login;