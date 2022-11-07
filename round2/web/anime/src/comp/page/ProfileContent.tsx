import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import GetUser from "../_supabase/getUser";
import { useNavigate } from "react-router-dom";
import SignOut from "../_supabase/signout";
import supabase from "../_supabase/supabase";

interface ProfileContentProps {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

export default function ProfileContent({ user, setUser }: ProfileContentProps) {
  const navigate = useNavigate();
  useEffect(() => {
    /* const test = async () => {
      const user = await supabase.auth.getUser();
    }; */

    const isLogedIn = () => {
      if (user === null) {
        navigate("/login");
      }
    };
    isLogedIn();
    console.log(user);
  }, []);

  const Logout = () => {
    SignOut();
    setUser(null);
  };
  return (
    <>
      {user != null ? (
        <>
          {/* <div>{user.data.user.email}</div> */}
          <button
            onClick={() => {
              Logout();
            }}>
            sign out
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
