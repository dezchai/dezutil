import { Log } from "./src/index.js";

const [log, elog, slog] = Log.create();
log("1234");
elog("1234");
slog("1234");

