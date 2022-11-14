import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import GetUser from "../_supabase/getUser";
import { useNavigate } from "react-router-dom";
import SignOut from "../_supabase/signout";
import GetAllAnime from "../_supabase/getAllAnime";
interface ProfileContentProps {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

export default function ProfileContent() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    let testArray: any[] = [];
    const getUser = async () => {
      let user = await GetUser();
      setUser(user);
      isLogedIn(user);
    };

    const isLogedIn = async (user: any) => {
      if (user.data.user === null) {
        navigate("/");
      } else {
        let anime = await GetAllAnime(user.data.user.id);
        if (anime.data) {
          testArray.push(anime.data);
        }
        console.log(testArray[0]);
      }
    };
    getUser();
  }, []);

  const FetchData = () => {
    fetch(`https://gogo-anime-api-sand.vercel.app/api/anime-api/popular?page=1`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

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
