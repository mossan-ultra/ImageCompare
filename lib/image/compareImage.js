const sharp = require("sharp");
const sampleImage1 = './testImage1.png';
const sampleImage2 = './testImage2.png';
// https://github.com/lovell/sharp/issues/934
async function compare(image1, image2) {
    const img1 = {
        src: image1,
        meta: await sharp(image1).raw().metadata(),
        raw: await sharp(image1).raw().toBuffer()
    }
    const img2 = {
        src: image2,
        meta: await sharp(image2).raw().metadata(),
        raw: await sharp(image2).raw().toBuffer()
    }
    let result = {};
    result.details = [];

    //img1のサイズ分のみ比較する
    for (let x = 0; x < img1.meta.width; x++) {
        for (let y = 0; y < img1.meta.height; y++) {
            const p1 = getPixelInfo(img1.raw, img1.meta, x, y);
            const p2 = getPixelInfo(img2.raw, img2.meta, x, y);
            let iscomp = false;
            if (p1 || p2) {
                if (p1.r === p2.r && p1.g === p2.g && p1.b === p2.b) {
                    iscomp = true;
                }
            }
            result.details.push({ x: x, y: y, compare: iscomp });
        }
    }

    //detail
    const per = 100 * (result.details.filter(item => item.compare).length / result.details.length)
    result.per = per;
    // result.overlayImage = await sharp(image1)
    //     .composite([{
    //         input: image2,
    //         blend: "over",
    //         top: 0,
    //         left: 0,
    //     }]).toFile('./overrayimage.jpg');
    
    // console.log(result.details.filter(item => item.compare).length);
    // console.log(result);
    // sharp( {
    //     create: {
    //         width: img1.meta.width,
    //         height: img1.meta.height,
    //         channels: 4,
    //         background: { r: 255, g: 255, b: 255}
    //     }
    // } ).raw()
    // .toBuffer().then(data=>{

    // })
    // .toFile( 出力パス );
    
    return result;
}
function getPixelInfo(rawBuffer, meta, x, y) {
    if (x >= meta.width || y >= meta.height) {
        return false;
    }
    const offset = meta.channels * (meta.width * y + x);
    const red = rawBuffer[offset];
    const green = rawBuffer[offset + 1];
    const blue = rawBuffer[offset + 2];

    return { r: red, g: green, b: blue };
}
// compare(sampleImage1, sampleImage2)
exports.compareImage = compare;
