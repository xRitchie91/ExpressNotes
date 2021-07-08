const express = require('express');
const fs = require("fs");
const htmlRoutes = require('./routes/html-routes')(app);
const apiRoutes = require('./routes/api-routes')(app);


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./assets"));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, function() {
    console.log(`Server is listening on PORT: ${PORT}`);
  });