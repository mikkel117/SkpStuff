import supabase from "./supabase";

const SignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    window.location.reload();
  }
};

export default SignOut;
