import supabase from "./supabase";
import { Navigate } from "react-router-dom";

const SignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    console.log("loged out");
    <Navigate to='/' replace={true} />;
  }
};

export default SignOut;
