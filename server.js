const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/2-1.angluar-qlnv'));
app.get('/*', function(req,res)

{res.sendFile(path.join(__dirname+'/dist/2-1.angluar-qlnv/index.html'));});

app.listen(process.env.PORT || 8080);