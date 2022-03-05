import { config, dom, library } from "@fortawesome/fontawesome-svg-core";
import { faHandPeace } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import "core-js";
import "es5-shim";
import "es6-shim";
import "es7-shim";
import "regenerator-runtime/runtime";

config.showMissingIcons = true;

library.add(faInfoCircle, faTicketAlt, faHandPeace);

dom.watch();
