const FILE_DIR = __dirname;
const fs = require("fs");
const path = require("path");

const TOP_JSON = path.join(FILE_DIR, "top.json");
const TABLE_JSON = path.join(FILE_DIR, "race-card.json");
const ODDS1_JSON = path.join(FILE_DIR, "odds1.json");
const ODDS2_JSON = path.join(FILE_DIR, "odds2.json");
const RESULT_JSON = path.join(FILE_DIR, "result.json");

const calcScore = (data) => {
  const FCP = data["audits"]["first-contentful-paint"]["score"];
  const SI = data["audits"]["speed-index"]["score"];
  const LCP = data["audits"]["largest-contentful-paint"]["score"];
  const TTI = data["audits"]["interactive"]["score"];
  const TBT = data["audits"]["total-blocking-time"]["score"];
  const CLS = data["audits"]["cumulative-layout-shift"]["score"];
  const score = FCP * 10 + SI * 10 + LCP * 25 + TTI * 10 + TBT * 30 + CLS * 15;
  return score;
};

const topScore = calcScore(JSON.parse(fs.readFileSync(TOP_JSON)));
const tableScore = calcScore(JSON.parse(fs.readFileSync(TABLE_JSON)));
const odds1Score = calcScore(JSON.parse(fs.readFileSync(ODDS1_JSON)));
const odds2Score = calcScore(JSON.parse(fs.readFileSync(ODDS2_JSON)));
const resultScore = calcScore(JSON.parse(fs.readFileSync(RESULT_JSON)));

console.log(
  "score: ",
  topScore + tableScore + odds1Score + odds2Score + resultScore,
);
