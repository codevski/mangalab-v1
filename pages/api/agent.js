import cookies from "../../utils/cookies";
import FormData from "form-data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const user = await prisma.user.findOne({ where: { id: 1 } });

  // Set user details for token exchange
  const formData = new FormData();
  formData.append("login_username", user.username);
  formData.append("login_password", user.password);
  formData.append("remember_me", user.remember_me);

  const results = await fetch(
    "https://mangadex.org/ajax/actions.ajax.php?function=login",
    {
      method: "POST",
      headers: {
        referer: "https://mangadex.org/login",
        "Access-Control-Allow-Origin": "*",
        "User-Agent": "mangadex-full-api",
        "X-Requested-With": "XMLHttpRequest",
        // "Content-Type": "multipart/form-data;",
      },
      body: formData,
    }
  )
    .then((res) => res)
    .catch((err) => console.log("something went wrong", err));

  // Pluck token out of headers
  const token = results.headers
    .get("set-cookie")
    .match(
      /(mangadex_session=|mangadex_rememberme_token=)(\w|-|;|\s|=|,|:|\/)+;\s(domain=.mangadex.org)/g
    );

  // Save token to user DB
  // TODO: Refactor logic what if remember me is not selected
  // TODO: Multiple sources support
  await prisma.user.update({
    where: { id: 1 },
    data: { token: `${token[0]}; ${token[1]};` },
  });
};

export default cookies(handler);
