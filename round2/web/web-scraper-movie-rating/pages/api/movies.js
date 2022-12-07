import { baseUrl, movies } from "../../helper";
import axios from "axios";
import cheerio from "cheerio";

export default async (req, res) => {
  try {
    let list = [];
    let hasNextPage = true;
    let movie;
    if (req.query.releases === undefined) {
      movie = await axios.get(`${baseUrl}${movies}?page=${req.query.page}`);
    } else {
      movie = await axios.get(
        `${baseUrl}${movies}/${req.query.releases}?page=${req.query.page}`
      );
    }
    const $ = cheerio.load(movie.data);
    if ($("div.page_wrapper > div.pagination").attr("id") === undefined) {
      hasNextPage = false;
    } else {
      hasNextPage = true;
    }
    $("div.page_wrapper > div.card").each((i, el) => {
      if ($(el).find("div.image > div.options").attr("data-id") != undefined) {
        list.push({
          id: $(el).find("div.image > div.options").attr("data-id"),
          name: $(el).find("div.image > div.wrapper > a").attr("title"),
          img:
            baseUrl +
            $(el).find("div.image > div.wrapper > a > img").attr("src"),
          releasDate: $(el).find("div.content > p").text(),
          userscore: $(el)
            .find("div.content > div.consensus > div > div")
            .attr("data-percent"),
        });
      }
    });

    res.status(200).json({ movies: list, hasNextPage });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};
