import supabase from "./supabase";

async function SupabaseDeleteUser(User) {
  await supabase.rpc("deleteUser", {
    userid: User.data.user.id,
  });
  window.location.reload();
}

export default SupabaseDeleteUser;
