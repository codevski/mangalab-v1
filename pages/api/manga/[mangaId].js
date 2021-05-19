import { PrismaClient } from "@prisma/client";
var fs = require("fs");
var https = require("https");

const prisma = new PrismaClient();

function saveImageToDisk(url, localPath) {
  console.log("GETTING IMAGE");
  var fullUrl = url;
  var file = fs.createWriteStream(localPath);
  var request = https.get(url, function (response) {
    response.pipe(file);
  });
}

export default async function (req, res) {
  const {
    query: { mangaId },
  } = req;

  const cookie = await prisma.user.findOne({ where: { id: 1 } });

  const data = await fetch(`https://mangadex.org/api/manga/${mangaId}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookie.token,
    },
  }).then((res) => res.text().then((data) => data));

  const { manga, chapter } = JSON.parse(data); // manga chapter etc

  // only add chapters from desired language
  const chapters = Object.entries(chapter).reduce((newChap, currChap) => {
    // console.log(currChap[1]);
    if (currChap[1].lang_code != "gb") return newChap;
    newChap.push({
      id: currChap[0],
      volume: currChap[1].volume,
      chapter: currChap[1].chapter,
    });
    return newChap;
  }, []);

  console.log(chapters);
  // return res.json({ chapter });
  if (req.method === "POST") {
    const cookie = await prisma.user.findOne({ where: { id: 1 } });

    const data = await fetch(`https://mangadex.org/api/manga/${mangaId}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie: cookie.token,
      },
    }).then((res) => res.text().then((data) => data));

    const { manga } = JSON.parse(data); // manga chapter etc

    console.log(manga.title);
    // save image to asset folder
    let image_path = "./public/assets/" + mangaId + ".jpg";
    saveImageToDisk(`https://mangadex.org/${manga.cover_url}`, image_path);

    await prisma.manga.create({
      data: {
        id: mangaId,
        title: manga.title,
        description: manga.description,
        image: image_path,
        chapters: { create: [...chapters] },
      },
    });
    // create
    return res.json({ status: "ok" });
  }
  if (req.method === "GET") {
    console.log(mangaId);
    const manga = await prisma.manga.findOne({
      where: { id: mangaId },
    });

    const chapters = await prisma.manga
      .findOne({
        where: { id: mangaId },
      })
      .chapters();

    return res.json({ manga, chapters });
  }

  if (req.method === "DELETE") {
    await prisma.chapter.deleteMany({ where: { mangaId } });
    await prisma.manga.delete({
      where: { id: mangaId },
    });
    return res.json({ status: "ok" });
  }

  return res.json(JSON.parse(data));
  // return res.json({ status: "ok" });
}
