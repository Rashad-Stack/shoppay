import dayjs from "dayjs";

export function calculateDiff(timeInMs) {
  const timestampDayjs = dayjs(timeInMs);
  const nowDayjs = dayjs();

  if (timestampDayjs.isBefore(nowDayjs)) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    };
  }

  const remainingSeconds = timestampDayjs.diff(nowDayjs, "seconds") % 60;
  const remainingMinutes = timestampDayjs.diff(nowDayjs, "minutes") % 60;
  const remainingHours = timestampDayjs.diff(nowDayjs, "hours") % 60;
  const remainingDays = timestampDayjs.diff(nowDayjs, "days");

  return {
    seconds: padWithZeros(remainingSeconds, 2),
    minutes: padWithZeros(remainingMinutes, 2),
    hours: padWithZeros(remainingHours, 2),
    days: remainingDays.toString(),
  };
}

function padWithZeros(number, length) {
  const numberString = number.toString();
  if (numberString.length >= length) {
    return numberString;
  }

  return "0".repeat(length - numberString.length) + numberString;
}
