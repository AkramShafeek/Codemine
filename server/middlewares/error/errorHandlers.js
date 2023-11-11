const notFoundError = (req, res) => {
  res.status(404).send("Path not found, please check your URL");
}

const internalServerError = (req, res, err, next) => {
  res.send(500).send("Internal server error, please try again later");
}

module.exports = {
  notFoundError,
  internalServerError
}