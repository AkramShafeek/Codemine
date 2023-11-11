const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.use(express.json());

const router = require('./routes/router');

const { notFoundError, internalServerError } = require('./middlewares/error/errorHandlers');

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.use('/api/v1', router);

app.use('*', notFoundError);

const port = process.env.PORT | 4000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));