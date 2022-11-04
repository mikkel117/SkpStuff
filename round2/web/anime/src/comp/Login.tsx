import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import CreateUser from "./_supabase/createUser";
import GetUser from "./_supabase/getUser";
import SupabaseLogin from "./_supabase/login";

interface loginProps {
  formvValue: string;
  setFormValue: Dispatch<SetStateAction<string>>;
}

export default function Login({ formvValue, setFormValue }: loginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === "" && password === "") {
      setLoginError("error");
    } else {
      if (formvValue === "login") {
        SupabaseLogin(email, password);
        console.log("login");
      } else {
        CreateUser(email, password);
        console.log("sing up");
      }
    }
  };
  return (
    <>
      {formvValue === "login" ? <h3>login</h3> : <h3>sing up</h3>}
      <form onSubmit={HandleSubmit}>
        <label htmlFor='email'>email:</label>
        <br />
        <input
          type='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor='password'>password:</label>
        <br />
        <input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError ? (
          <>
            <br /> <span>{loginError}</span>
          </>
        ) : (
          <></>
        )}

        <br />
        <input type='submit' />
      </form>
    </>
  );
}
