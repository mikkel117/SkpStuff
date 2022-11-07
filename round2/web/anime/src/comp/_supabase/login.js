import supabase from "./supabase";

const SupabaseLogin = async (Email, Password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: Email,
    password: Password,
  });
  if (error) {
    return error;
  }

  return "logedin";
};

export default SupabaseLogin;
