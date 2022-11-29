import {
  baseUrl,
  popular,
  movies,
  moviesAjexBaseUrl,
  moviesAjexEndpoint,
  posterBaseUrl,
} from "../../helper";
import axios from "axios";
import cheerio from "cheerio";

export default async (req, res) => {
  try {
    let list = [];
    let heroImg;
    let bigImg;
    const movie = await axios.get(
      `${moviesAjexBaseUrl}this/week/${moviesAjexEndpoint}`
    );
    const $ = cheerio.load(movie.data);
    const id = $("ul > li")
      .first()
      .find("div")
      .attr("data-film-slug")
      .replace("/film/", "")
      .replace("/", "");
    const name = $("ul > li").first().find("div > img").attr("alt");
    const getHeroImg = await axios.get(`${posterBaseUrl}${id}/hero/230x345`);
    const $hero = cheerio.load(getHeroImg.data);
    heroImg = $hero("img.image").attr("src");

    //can be used if the image is not big enough
    /* const getBigImg = await axios.get(`${posterBaseUrl}${id}/std/500x750/`);
    const $bigImg = cheerio.load(getBigImg.data); */
    /* bigImg = $bigImg("img.image").attr("src"); */
    return res.status(200).json({
      id: id,
      name: name,
      heroImg: heroImg,
    });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};
