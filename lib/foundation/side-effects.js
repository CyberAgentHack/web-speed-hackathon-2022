import { library } from "@fortawesome/fontawesome-svg-core";
import { faHandPeace } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo, faTicket } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

library.add(faCircleInfo, faTicket, faHandPeace);

dayjs.extend(utc);
