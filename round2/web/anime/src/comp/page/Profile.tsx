import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import supabase from "../_supabase/supabase";
import CreateUser from "../_supabase/createUser";
import SupabaseLogin from "../_supabase/login";
import GetUser from "../_supabase/getUser";
import Login from "../Login";
import SignOut from "../_supabase/signout";

import { useNavigate } from "react-router-dom";

interface ProfileProps {
  formValue: string;
  setFormValue: Dispatch<SetStateAction<string>>;
}

export default function Profile({ formValue, setFormValue }: ProfileProps) {
  const [isUserLogedin, setIsUserLogedin] = useState<boolean>(false);
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
  return (
    <div className='profileContentWrapper'>
      {isUserLogedin ? (
        <></>
      ) : (
        <>
          {formValue != "" && (
            <Login formvValue={formValue} setFormValue={setFormValue} />
          )}
        </>
      )}
    </div>
  );
}
