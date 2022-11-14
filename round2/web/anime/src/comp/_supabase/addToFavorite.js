import supabase from "./supabase";

const AddToFavorite = async (User, Anime) => {
  const { error } = await supabase
    .from("anime")
    .insert({ userId: User, animeId: Anime });
  if (error) {
    console.log(error);
  }
};

export default AddToFavorite;
