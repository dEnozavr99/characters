export const getCurrentTimeString = () => {
  const currentDate = new Date();
  const formatter = new Intl.DateTimeFormat("ua-UA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formatter.format(currentDate);
};
