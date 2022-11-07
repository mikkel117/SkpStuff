import React, { useEffect, useState } from "react";
import supabase from "../_supabase/supabase";
import CreateUser from "../_supabase/createUser";
import SupabaseLogin from "../_supabase/login";
import GetUser from "../_supabase/getUser";
import Login from "../Login";
import SignOut from "../_supabase/signout";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [isUserLogedin, setIsUserLogedin] = useState<boolean>(false);
  const [isFormHidden, setIsFormHidden] = useState<boolean>(true);
  const [formValue, setFormValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      let user = await GetUser();
      islogdin(user);
    };

    const islogdin = (user: any) => {
      if (user) {
        if (user.data.user != null) {
          setIsUserLogedin(true);
          navigate("/profile");
        } else {
          setIsUserLogedin(false);
        }
      }
    };
    getUser();
  }, []);

  const showForm = (FormValue: string) => {
    setIsFormHidden(!isFormHidden);
    setFormValue(FormValue);
  };
  return (
    <div className='profileContentWrapper'>
      {isUserLogedin ? (
        <></>
      ) : (
        <>
          {isFormHidden ? (
            <>
              <button
                onClick={() => {
                  showForm("login");
                }}>
                login
              </button>
              <button
                onClick={() => {
                  showForm("singUp");
                }}>
                sing up
              </button>
            </>
          ) : (
            <Login
              formvValue={formValue}
              setFormValue={setFormValue}
              setIsFormHidden={setIsFormHidden}
            />
          )}
        </>
      )}
    </div>
  );
}
