// Validation Middleware
function validateUserInput(req, res, next) {
  const {name, email, message} = req.body;
  // validate name
  if (!name || typeof name !== "string" || name.length < 2) {
    return res.status(400).json({
      error: "Name is required and must be at least 2 characters long",
    });
  }
  // validate email
  if (!email || !email.includes("@")) {
    return res.status(400).json({
      error: " A valid email is required",
    });
  }
  // validate message
  if (message && typeof message !== "string") {
    return res.status(400).json({
      error: "Message must be a string",
    });
  }
  next();
}
export default validateUserInput;