import { baseUrl, movies } from "../../helper";
import axios from "axios";
import cheerio from "cheerio";

export default async (req, res) => {
  try {
    let list = [];
    let movie;
    if (req.query.releases === undefined) {
      movie = await axios.get(`${baseUrl}tv?page=${req.query.page}`);
    } else {
      movie = await axios.get(
        `${baseUrl}tv/${req.query.releases}?page=${req.query.page}`
      );
    }
    const $ = cheerio.load(movie.data);
    $("div.page_wrapper div.card").each((i, el) => {
      if ($(el).find("div.image > div.options").attr("data-id") != undefined) {
        list.push({
          id: $(el)
            .find("div.image div.wrapper a")
            .attr("href")
            .replace(/\D/g, "")
            .replace(/\//g, ""),
          title: $(el).find("div.content h2 a").text(),
          releasDate: $(el).find("div.content p").text(),
          userscore: $(el)
            .find("div.content div.outer_ring div")
            .attr("data-percent"),
          img:
            baseUrl + $(el).find("div.image > div.wrapper a img").attr("src"),
        });
      }
    });

    res.status(200).json(list);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};
