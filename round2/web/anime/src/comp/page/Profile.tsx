import React, { useEffect, useState } from "react";
import supabase from "../_supabase/supabase";
import CreateUser from "../_supabase/createUser";
import SupabaseLogin from "../_supabase/login";
import GetUser from "../_supabase/getUser";
import Login from "../Login";

export default function Profile() {
  const [isUserLogedin, setIsUserLogedin] = useState<boolean>(false);
  const [isFormHidden, setIsFormHidden] = useState<boolean>(true);
  const [formValue, setFormValue] = useState<string>("");
  const [user, setUser] = useState<any>();
  useEffect(() => {
    GetUser().then(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      if (user.data.user != null) {
        setIsUserLogedin(true);
      } else {
        setIsUserLogedin(false);
      }
    }
  }, [user]);

  const showForm = (FormValue: string) => {
    setIsFormHidden(!isFormHidden);
    setFormValue(FormValue);
  };
  return (
    <div className='profileContentWrapper'>
      {isUserLogedin ? (
        <>test</>
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
            <Login formvValue={formValue} setFormValue={setFormValue} />
          )}
        </>
      )}
    </div>
  );
}
