import supabase from "./supabase";

const GetData = async (User, Anime) => {
  const { data, error } = await supabase
    .from("anime")
    .select()
    .eq("userId", User)
    .eq("animeId", Anime)
    .single();
  return {
    data: data,
    error: error,
  };
};

export default GetData;
