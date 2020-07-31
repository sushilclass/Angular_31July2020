var express = require('express');
var app = express();

app.use('/PropertiesGUI', express.static('dist/PropertiesGUI'));
app.use('/ConfigurationGUI', express.static('dist/ConfigurationGUI'));

app.listen(4200);