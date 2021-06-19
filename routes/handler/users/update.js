const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_USER } = process.env;

//API Adapter inisialisation
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    //Get data id user from decoded data verifyToken.js handler
    const id = req.user.data.id;

    //Update users data by Id user
    const user = await api.put(`/users/${id}`, req.body);

    return res.json(user.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "Service Unavailable" });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
