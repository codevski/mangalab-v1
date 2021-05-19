const jsdom = require("jsdom");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const title = req.query.title;
  const { JSDOM } = jsdom;
  const cookie = await prisma.user.findOne({ where: { id: 1 } });

  const data2 = await fetch(`https://mangadex.org/search?title=${title}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookie.token,
    },
  }).then((res) => res.text().then((data) => data));
  // }).then((res) => res);

  const { window } = new JSDOM(data2);

  // console.log(data3.data);

  const searchblock = [
    ...window.document.getElementsByClassName(
      "manga-entry col-lg-6 border-bottom pl-0 my-1"
    ),
  ];

  // console.log(testing);

  // testing.map((d) => con sole.log(d.innerHTML));

  // const testing = searchblock[0].querySelectorAll("a[href^='/title']");

  // testing.forEach((d) => console.log(d.outerHTML));

  const resultLatest = searchblock.reduce((newArr, curr) => {
    const image = curr.innerHTML.match(/(\/images\/manga\/[0-9]+.[A-z]+.jpg)/g);
    const title = curr.getElementsByClassName("manga_title");
    const link = curr.querySelectorAll("a[href^='/title']");
    const id = /\d+/g;
    console.log(link[0].outerHTML);
    newArr.push({
      image: image[0],
      title: title[0].innerHTML,
      link: link[0].outerHTML
        .match(/\/title\/\d+\/((\w)+-|(\w)+)+/g)
        .toString(),
      id: id.exec(link[0].outerHTML).toString(),
      // user: "user",
      // time: time[1].innerHTML.match(/[0-9]+ [a-z]*/g),
    });

    return newArr;
  }, []);
  // console.log(data2.headers);
  res.statusCode = 200;

  // console.log(resultLatest);
  // res.json(data2.headers);
  res.json({ search: resultLatest });
};
