import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

const customDayjs = dayjs;

var thresholds = [
  { l: "ss", r: 59, d: "second" },
  { l: "m", r: 1 },
  { l: "mm", r: 59, d: "minute" },
  { l: "h", r: 1 },
  { l: "hh", r: 23, d: "hour" },
  { l: "d", r: 1 },
  { l: "dd", r: 29, d: "day" },
  { l: "M", r: 1 },
  { l: "MM", r: 11, d: "month" },
  { l: "y" },
  { l: "yy", d: "year" },
];
customDayjs.extend(updateLocale);
customDayjs.extend(relativeTime, {
  thresholds: thresholds,
  rounding: Math.floor,
});
customDayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    ss: "%d seconds ago",
    m: "1 minute ago",
    mm: "%d minutes ago",
    h: "1 hour ago",
    hh: "%d hours ago",
    d: "1 day ago",
    dd: "%d days ago",
    M: "1 minute",
    MM: "%d minutes ago",
    y: "1 year ago",
    yy: "%d years ago",
  },
});

export { customDayjs };
