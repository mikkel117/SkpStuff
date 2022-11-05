import supabase from "./supabase";
import GetUser from "./getUser";

async function CreateUser(Email, Password) {
  const { error } = await supabase.auth.signUp({
    email: Email,
    password: Password,
  });
  if (error) {
    console.log(error);
  }
  const user = await supabase.auth.getUser();
}

export default CreateUser;
