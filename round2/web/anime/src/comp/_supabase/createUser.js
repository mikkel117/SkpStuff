import supabase from "./supabase";
import GetUser from "./getUser";

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
