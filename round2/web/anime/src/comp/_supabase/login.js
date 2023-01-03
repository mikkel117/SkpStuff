import supabase from "./supabase";

const SupabaseLogin = async (Email, Password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: Email,
    password: Password,
  });
  if (error) {
    let errorSplit = error.toString().split(":");
    return errorSplit[1];
  }

  return "logedin";
};

export default SupabaseLogin;
