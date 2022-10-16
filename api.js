/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
const multer = require('multer');
const compareText = require('./lib/image/compareText');
const compareImage = require('./lib/image/compareImage');
const os = require('os');


var app = express();

var server = app.listen(3000, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

const upload = multer({ dest: os.tmpdir() })
app.post('/api/imgcompare', upload.array('img', 2), (req, res,next ) => {
    const image1 = req.files[0].path;
    const image2 = req.files[1].path;
    (async () => {
        const textCompareResult = await compareText.compareText(image1, image2);
        console.log(textCompareResult);
        const imageCompareResult = await compareImage.compareImage(image1, image2);
        console.log(imageCompareResult);

        const result = {
            isMatchText: textCompareResult.lines.filter(item => item.distance !== 0).length === 0,
            isImage: imageCompareResult.per === 100,
            pixelMatchPer: imageCompareResult.per,
            textDetails:textCompareResult
        }
        res.send(result)
    })();

});
app.get('/api/imgcompare', (req, res) => {
    res.status(200).sendFile(__dirname + '/pages/imgcompare.html')
});
