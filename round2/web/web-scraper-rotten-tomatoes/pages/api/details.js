import { baseUrl, movieDetails } from "../../Helpers";
import axios from "axios";
import cheerio from "cheerio";

export default async (req, res) => {
  let list = [];
  const info = [];
  try {
    const movie = await axios.get(`${baseUrl}${movieDetails}${req.query.id}`);
    const $ = cheerio.load(movie.data);
    const test = $(
      "div.tomatometer-container div div.wrap span.percentage"
    ).text();
    const title = $(
      "div.thumbnail-scoreboard-wrap h1.scoreboard__title"
    ).text();
    const aboutMovie = $("div.panel-body div.movie_synopsis").text().trim();
    $("div.panel-body ul.info li").each((i, el) => {
      let first = $(el).find("div.meta-label").text();
      let second = $(el)
        .find("div.meta-value")
        .text()
        .replace(/,/g, ", ")
        .replace(/\s+/g, " ")
        .trim();
      info.push({ [first]: second });
    });
    list.push({
      title: title,
      about: aboutMovie,
      test,
      info: info,
    });
    return res.status(200).json(list);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};
