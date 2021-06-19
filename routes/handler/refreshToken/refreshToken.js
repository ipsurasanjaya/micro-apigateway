const jwt = require("jsonwebtoken");

const apiAdapter = require("../../apiAdapter");
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

//API Adapter inisialisation
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    //Get two parameter, email and refresh token
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    //Check refresh token have sent by front end

    if (!refreshToken || !email) {
      return res.status(400).json({
        status: "error",
        message: "Invalid token",
      });
    }

    //Check refresh token does exist on database
    await api.get("/refresh_tokens", {
      params: { refresh_token: refreshToken },
    });

    //Check refresh token valid and not expires using jwt.verify

    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          message: err.message,
        });
      }

      //Check email from request body equal to decoded data email

      if (email != decoded.data.email) {
        return res.status(403).json({
          status: "error",
          message: "Email is not valid",
        });
      }

      //If email is true, it can assume email request body equal to jwt refresh token email

      const token = jwt.sign({ data: decoded.data }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });

      //Return token to front end, so front end can use token

      return res.json({
        status: "success",
        data: {
          token,
        },
      });
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        status: "error",
        message: "Service Unavailable",
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
