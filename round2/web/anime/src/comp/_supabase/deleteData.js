import supabase from "./supabase";

const DeleteData = async (User, Anime) => {
  let { data, error } = await supabase
    .from("anime")
    .delete()
    .eq("userId", User)
    .eq("animeId", Anime)
    .single();
  return {
    data: data,
    error: error,
  };
};

export default DeleteData;
