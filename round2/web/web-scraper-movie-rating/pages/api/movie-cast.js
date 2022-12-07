import { baseUrl, movies } from "../../helper";
import axios from "axios";
import cheerio from "cheerio";

export default async (req, res) => {
  try {
    const movie = await axios.get(`${baseUrl}${movies}${req.query.id}/cast`);
    const $ = cheerio.load(movie.data);
    const id = req.query.id;
    let cast = [];
    $("section.panel")
      .first()
      .find("ol > li")
      .each((i, el) => {
        const img = baseUrl + $(el).find("a > img").attr("src");
        const name = $(el).find("div > div > p").first().find("a").text();
        const character = $(el).find("div > div > p.character").text().trim();
        cast.push({
          img,
          name,
          character,
        });
      });
    res.status(200).json({
      id,
      cast,
    });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};
