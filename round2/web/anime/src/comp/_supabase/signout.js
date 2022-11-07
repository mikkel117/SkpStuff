import supabase from "./supabase";

const SignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    console.log("loged out");
    window.location.reload();
  }
};

export default SignOut;
