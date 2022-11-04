import supabase from "./supabase";

const GetUser = async () => {
  const user = await supabase.auth.getUser();
  return user;
};

export default GetUser;
