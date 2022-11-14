import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import CreateUser from "./_supabase/createUser";
import SupabaseLogin from "./_supabase/login";
import { useNavigate } from "react-router-dom";

interface loginProps {
  formvValue: string;
  setFormValue: Dispatch<SetStateAction<string>>;
}

export default function Login({ formvValue, setFormValue }: loginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const navigate = useNavigate();

  const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === "" && password === "") {
      setLoginError("error");
    } else {
      if (formvValue === "login") {
        const login = await SupabaseLogin(email, password);
        if (login === "logedin") {
          setFormValue("");
          navigate("/profile");
        }
      } else {
        const signup = await CreateUser(email, password);
        if (signup === "signedUp") {
          setFormValue("");
          navigate("/profile");
        }
      }
    }
  };

  const Cancle = () => {
    setFormValue("");
    navigate("/");
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
        <button
          onClick={() => {
            Cancle();
          }}>
          cancle
        </button>
      </form>
    </>
  );
}
