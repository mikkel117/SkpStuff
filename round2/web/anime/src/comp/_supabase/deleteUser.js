import supabase from "./supabase";

async function SupabaseDeleteUser(User) {
  const { data, error } = await supabase.rpc("deleteUser", {
    id: User.data.user.id,
  });
  console.log("user id: ", User.data.user.id);
  console.log(error);
}

export default SupabaseDeleteUser;
