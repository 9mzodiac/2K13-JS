import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import calendar from "dayjs/plugin/calendar";

var thresholds = [
  { l: "s", r: 1, d: "second" },
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
dayjs.extend(updateLocale);
dayjs.extend(calendar);

dayjs.extend(relativeTime, {
  thresholds: thresholds,
  rounding: Math.floor,
});
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1 second ago",
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
dayjs().calendar(null, {
  sameDay: "[Today at] h:mm A",
  nextDay: "[Tomorrow at] h:mm A",
  nextWeek: "dddd [at] h:mm A",
  lastDay: "[Yesterday at] h:mm A",
  lastWeek: "[Last] dddd [at] h:mm A",
  sameElse: "DD/MM/YYYY",
});

export const getTime = (seconds: any) => {
  const now = dayjs();
  const date = dayjs(dayjs.unix(seconds));

  const hoursDiff = now.diff(date, "h");
  if (hoursDiff <= 3) {
    return dayjs(date).fromNow();
  } else {
    return dayjs().calendar(date);
  }
};
