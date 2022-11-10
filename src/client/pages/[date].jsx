import { fetchRaces, TopPage } from "./index";

export async function getServerSideProps({ query }) {
  return fetchRaces({ query });
}

export default function Date({ races }) {
  return TopPage({ races });
}
