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
  const user = await supabase.auth.getUser();
  createData(user);
  return "signedUp";
}

const createData = async (user) => {
  const { data, error } = await supabase
    .from("animeUser")
    .insert({ userId: user.data.user.id });
  if (error) {
    console.log(error);
  }
};

export default CreateUser;
