import { baseUrl, movies } from "../../helper";
import axios from "axios";
import cheerio from "cheerio";

export default async (req, res) => {
  try {
    let genre = [];
    const movie = await axios.get(`${baseUrl}tv/${req.query.id}`);
    const $ = cheerio.load(movie.data);
    const id = req.query.id;
    const poster =
      baseUrl + $("div.poster > div.image_content > img").attr("data-src");
    const name = $("div.title > h2 > a").text();
    const releaseYear = $("div.title > h2 span").text();
    const userScire = $("div.user_score_chart").attr("data-percent");
    const tempGenre = $("div.title > div.facts > span.genres")
      .text()
      .trim()
      .split(",");
    tempGenre.map((item) => {
      genre.push(item.replace(/\s/, ""));
    });
    const release = $("div.title > div.facts > span.release").text().trim();
    const runtime = $("div.title > div.facts > span.runtime").text().trim();
    const overview = $("div.overview > p").text();
    let facts = [];
    $("section.facts > p").each((i, el) => {
      facts.push($(el).text().trim());
    });
    let keywords = [];
    $("section.keywords > ul > li").each((i, el) => {
      keywords.push($(el).find("a").text());
    });
    res.status(200).json({
      id,
      poster,
      name,
      releaseYear,
      userScire,
      genre,
      release,
      runtime,
      overview,
      facts,
      keywords,
    });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};
