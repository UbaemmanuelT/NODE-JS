// Custom logging middleware
const logger = (req, res, next) => {
  const nigeriaTime = new Date().toLocaleString("en-Ng", {
    timeZone: "Africa/Lagos",
    hours12: false,
  });

  console.log(`[${nigeriaTime}] ${req.method} ${req.url}`);
  next();
};
export default logger;
