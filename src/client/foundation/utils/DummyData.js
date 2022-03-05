export const defaultPlayer = {
  id: "",
  image: "",
  name: "　　　",
  number: null,
};

export const defaultEntries = Array(12)
  .fill(null)
  .map((_, i) => ({
    comment: "",
    first: null,
    firstRate: null,
    id: i,
    number: null,
    others: null,
    paperWin: null,
    player: defaultPlayer,
    predictionMark: "",
    rockWin: null,
    scissorsWin: null,
    second: null,
    third: null,
    thirdRate: null,
  }));

export const dummyOdds = Array(50)
  .fill(null)
  .map((_, i) => ({
    id: i,
    key: [null, null, null],
    odds: 0,
    type: "trifecta",
  }));
