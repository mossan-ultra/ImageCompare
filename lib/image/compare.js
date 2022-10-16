const compareText = require('./compareText.js');
const compareImage = require('./compareImage.js');

console.log(process.argv)
const image1 = process.argv[2];
const image2 = process.argv[3];
(async ()=>{
    const textCompareResult = await compareText.compareText(image1,image2);
    console.log(textCompareResult);
    const imageCompareResult = await compareImage.compareImage(image1,image2);
    console.log(imageCompareResult);

    const result = {
        isMatchText : textCompareResult.lines.filter(item=>item.distance !== 0).length === 0,
        isImage : imageCompareResult.per === 100,
        pixelMatchPer : imageCompareResult.per,
    }
    console.log(result)
})();

