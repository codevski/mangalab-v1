const jsdom = require("jsdom");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const { JSDOM } = jsdom;
  const cookie = await prisma.user.findOne({ where: { id: 1 } });

  const data2 = await fetch("http://mangadex.org/", {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookie.token,
    },
  }).then((res) => res.text().then((data) => data));
  // }).then((res) => res);

  const { window } = new JSDOM(data2);

  // console.log(data3.data);

  // const testing = [
  //   ...window.document.getElementsByClassName("nav-item mx-1 dropdown"),
  // ];

  // testing.map((d) => console.log(d.innerHTML));

  const sixHr = [
    ...window.document
      .getElementById("six_hours")
      .getElementsByClassName("list-group-item px-2 py-1"),
  ];

  const latest = [
    ...window.document
      .getElementById("latest_update")
      .getElementsByClassName("col-md-6 border-bottom p-2"),
  ];

  const resultSixHr = sixHr.reduce((newArr, curr) => {
    const image = curr.innerHTML.match(
      /(https:\/\/mangadex.org\/images\/manga\/[0-9]+.[A-z]+.jpg)/g
    );
    const title = curr.getElementsByClassName("manga_title");
    const chapter = curr.querySelectorAll("a[href^='/chapter']");
    newArr.push({
      image: image[0],
      title: title[0].innerHTML,
      chapter: chapter[0].innerHTML,
    });

    return newArr;
  }, []);

  const resultLatest = latest.reduce((newArr, curr) => {
    const image = curr.innerHTML.match(
      /(https:\/\/mangadex.org\/images\/manga\/[0-9]+.[A-z]+.jpg)/g
    );
    const title = curr.getElementsByClassName("manga_title");
    const chapter = curr.querySelectorAll("a[href^='/chapter']");
    const time = curr.getElementsByClassName("text-truncate py-0 mb-1");
    newArr.push({
      image: image[0],
      title: title[0].innerHTML,
      chapter: chapter[0].innerHTML,
      user: "user",
      time: time[1].innerHTML.match(/[0-9]+ [a-z]*/g),
    });

    return newArr;
  }, []);
  // console.log(data2.headers);
  res.statusCode = 200;
  // res.json(data2.headers);
  res.json({ latest: resultLatest, "6h": resultSixHr });
};
