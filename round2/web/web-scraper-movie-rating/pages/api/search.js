import { baseUrl, movies } from "../../helper";
import axios from "axios";
import cheerio from "cheerio";

export default async (req, res) => {
  try {
    let search;
    let list = [];
    console.log(req.query);
    console.log(baseUrl + "search/" + req.query.watch + req.query.search);
    search = await axios.get(
      `${baseUrl}search/${req.query.watch}?page=${req.query.page}&query=${req.query.search}`
    );
    const $ = cheerio.load(search.data);
    switch (req.query.watch) {
      case "movie":
        $("div.movie > div > div.card").each((i, el) => {
          list.push({
            id: $(el)
              .find("div.image div a")
              .attr("href")
              .replace("/movie/", ""),
            name: $(el)
              .find("div.details div.wrapper div.title div a h2")
              .text(),
            releaseDate: $(el)
              .find("div.details div.wrapper div.title span")
              .text(),
            overview: $(el).find("div.overview p").text(),
            img: baseUrl + $(el).find("div.image div a img").attr("src"),
          });
        });
        break;
      case "tv":
        $("div.tv > div > div.card").each((i, el) => {
          list.push({
            id: $(el).find("div.image div a").attr("href").replace("/tv/", ""),
            name: $(el)
              .find("div.details div.wrapper div.title div a h2")
              .text(),
            releaseDate: $(el)
              .find("div.details div.wrapper div.title span")
              .text(),
            overview: $(el).find("div.overview p").text(),
            img: baseUrl + $(el).find("div.image div a img").attr("src"),
          });
        });
        break;
      case "person":
        $("div.person > div > div.profile").each((i, el) => {
          let img = $(el).find("div div a img").attr("src");
          let beninArr = [];
          $(el)
            .find("div.content p.sub a")
            .each((i, el) => {
              beninArr.push({
                id: $(el).attr("href").replace(/\D/g, ""),
                watch: $(el)
                  .attr("href")
                  .replace(/[0-9]/g, "")
                  .replace(/\//g, ""),
                title: $(el).text(),
              });
            });
          list.push({
            id: $(el).find("div div a").attr("href").replace("/person/", ""),
            name: $(el).find("div.content p.name a").text(),
            job: $(el).find("div.content p.sub span").text(),
            benin: beninArr,
            img: baseUrl + img,
          });
        });
        break;
      case "network":
        $("div.network div ul li").each((i, el) => {
          list.push({
            id: $(el).find("a").attr("href").replace("/network/", ""),
            img: baseUrl + $(el).find("a div img").attr("src"),
          });
        });
        break;
      default:
        break;
    }
    if (list.length === 0) {
      res.status(404).json("not found");
    } else {
      res.status(200).json(list);
    }
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};
