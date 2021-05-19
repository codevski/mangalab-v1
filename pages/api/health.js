import { PrismaClient } from "@prisma/client";
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const pjson = require("../../package.json");

const prisma = new PrismaClient();

export default async function (req, res) {
  const { stdout: node, stderr } = await exec("node --version");
  stderr && console.error("Error has occured", stderr);

  const status = await prisma
    .$connect()
    .then(() => "connected")
    .catch((err) => console.error("Connection to db has failed", err));

  const version = `alpha-${pjson.version}`;

  return res.json({
    status,
    version,
    node,
  });
}
