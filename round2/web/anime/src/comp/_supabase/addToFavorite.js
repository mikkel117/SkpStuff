import supabase from "./supabase";

const AddToFavorite = async (User, AnimeId, AnimeTitle, AnimeImg) => {
  const { error } = await supabase
    .from("anime")
    .insert({
      userId: User,
      animeId: AnimeId,
      animeTitle: AnimeTitle,
      animeImg: AnimeImg,
    });
  if (error) {
    console.log(error);
  }
};

export default AddToFavorite;
