declare type BettingType = "trifecta";

declare namespace Model {
  type User = import("./User").User;

  type Player = import("./Player").Player;

  type RaceEntry = import("./RaceEntry").RaceEntry;

  type OddsItem = import("./OddsItem").OddsItem;

  type Race = import("./Race").Race;

  type BettingTicket = import("./BettingTicket").BettingTicket;

  interface HeroImage {
    url: string;
    hash: string;
  }
}
