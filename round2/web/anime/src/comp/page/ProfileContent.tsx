import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import GetUser from "../_supabase/getUser";
import { useNavigate } from "react-router-dom";
import SignOut from "../_supabase/signout";
import supabase from "../_supabase/supabase";

interface ProfileContentProps {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

export default function ProfileContent() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      let user = await GetUser();
      setUser(user);
      isLogedIn(user);
    };

    const isLogedIn = (user: any) => {
      if (user.data.user === null) {
        navigate("/login");
      }
    };
    getUser();
  }, []);

  const Logout = () => {
    SignOut();
    setUser(null);
  };
  return (
    <>
      {user ? (
        <>
          <div>{user.data.user.email}</div>
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
