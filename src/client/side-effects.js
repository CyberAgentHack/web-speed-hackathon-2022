import { library } from "@fortawesome/fontawesome-svg-core";
import { faHandPeace } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo, faTicket } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import axios from "axios";

// fortawesome
library.add(faCircleInfo, faTicket, faHandPeace);


// dayjs
dayjs.extend(utc);


// axios
axios.interceptors.request.use((request) => {
  request.baseURL = process.env.NEXT_API_HOST;
  request.headers["Access-Control-Allow-Origin"] = "*"
  request.headers["Cache-Control"] = "public, s-maxage=31536000, stale-while-revalidate"
  return request;
});

axios.interceptors.response.use((response) => {
  return response;
});
