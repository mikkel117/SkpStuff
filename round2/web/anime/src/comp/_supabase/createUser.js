import supabase from "./supabase";

async function CreateUser(Email, Password) {
  const { error } = await supabase.auth.signUp({
    email: Email,
    password: Password,
  });
  if (error) {
    return error;
  }
  return "signedUp";
}

export default CreateUser;
