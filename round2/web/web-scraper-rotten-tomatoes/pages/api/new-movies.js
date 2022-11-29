import { baseUrl } from "../../Helpers";
import { moviesTheaters } from "../../Helpers";
import axios from "axios";
import cheerio from "cheerio";

export default async (req, res) => {
  let list = [];
  try {
    const newMovies = await axios.get(
      `${baseUrl}${moviesTheaters}/sort:newest?page=1`
    );
    const $ = cheerio.load(newMovies.data);

    $(
      "div.discovery-grids-container > div.discovery-tiles > div.discovery-tiles__wrap > a"
    ).each((i, el) => {
      list.push({
        id: $(el).find("img").attr("alt").replace(/\s/g, "_"),
        title: $(el).find("img").attr("alt"),
        img: $(el).find("img").attr("src"),
        releaceDate: $(el)
          .find("div > span.smaller")
          .text()
          .replace("Opens", "")
          .replace("Opened", "")
          .replace(/\s/g, "")
          .replace(/.{3}/, "$& ")
          .replace(/,/, ", "),
      });
    });

    return res.status(200).json(list);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};
