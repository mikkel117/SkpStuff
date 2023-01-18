import { useEffect, useState, Dispatch, SetStateAction } from "react";
import GetUser from "../_supabase/getUser";
import Login from "../Login";

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
    <div className='loginWrapper'>
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
