const Tesseract = require('tesseract.js');
// console.log(Tesseract)

const sampleImage = './testImage1.png';

 function recognize(image) {
    return Tesseract.recognize(
        image,
        'eng+jpn'
        // ,{ logger: m => console.log(m) }
    );
}

// function test(){
//     recognize(sampleImage).then(result=>console.log(result.data.text))
// };
// test();

exports.recognize = recognize;
