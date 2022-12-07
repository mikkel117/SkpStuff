import { baseUrl, movies } from "../../helper";
import axios from "axios";
import cheerio from "cheerio";

export default async (req, res) => {
  try {
    const movie = await axios.get(`${baseUrl}`);
    const $ = cheerio.load(movie.data);
    const movies = [];
    const tvShows = [];
    const people = [];
    $("ul.dropdown_menu > li").each((i, el) => {
      if ($(el).find("a.no_click").text() != "More")
        if ($(el).find("a").first().text() === "Movies") {
          //movies.push($(el).find("a").first().text());
          $($(el))
            .find("ul li")
            .each((i, ell) => {
              movies.push($(ell).find("a").text());
            });
        }
      if ($(el).find("a").first().text() === "TV Shows") {
        $($(el))
          .find("ul li")
          .each((i, ell) => {
            tvShows.push($(ell).find("a").text());
          });
      }
      if ($(el).find("a").first().text() === "People") {
        $($(el))
          .find("ul li")
          .each((i, ell) => {
            people.push($(ell).find("a").text());
          });
      }
    });
    res.status(200).json({
      movies,
      tvShows,
      people,
    });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};
