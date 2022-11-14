import supabase from "./supabase";

const GetAllAnime = async (User) => {
  const { data, error } = await supabase
    .from("anime")
    .select()
    .eq("userId", User);
  return {
    data: data,
    error: error,
  };
};

export default GetAllAnime;
