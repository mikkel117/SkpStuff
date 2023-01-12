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
      setLoginError("email and password must not be empty");
    } else {
      if (formvValue === "login") {
        const login = await SupabaseLogin(email, password);

        if (login === "logedin") {
          setFormValue("");
          navigate("/profile");
        } else {
          console.log(login);

          setLoginError(login.toString());
        }
      } else {
        const signup = await CreateUser(email, password);
        if (signup === "signedUp") {
          setFormValue("");
          navigate("/profile");
        } else {
          setLoginError(signup.toString());
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

        <input
          type='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='password'>password:</label>

        <input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError ? (
          <>
            <span className='loginError'>{loginError}</span>
          </>
        ) : (
          <></>
        )}
        <div>
          <input
            type='submit'
            value={formvValue === "login" ? "Login" : "Sing up"}
            className='login'
          />
          <button
            onClick={() => {
              Cancle();
            }}>
            cancle
          </button>
        </div>
      </form>
    </>
  );
}
