import supabase from "./supabase";

const SupabaseLogin = async (Email, Password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: Email,
    password: Password,
  });
  if (error) {
    console.log(error);
  }
  if (user) {
    console.log(user);
  }
};

export default SupabaseLogin;
