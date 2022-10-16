const extractText = require('./extractText.js');
const sampleImage1 = './testImage1.png';
const sampleImage2 = './testImage2.png';

async function compare(image1, image2) {
    console.log(image2)
    return new Promise((resolve, reject) => {
        Promise.all([extractText.recognize(image1), extractText.recognize(image2)])
            .then((r) => {
                const lines = {
                    i1: r[0].data.text.split('\n').filter(item => item.length !== 0),
                    i2: r[1].data.text.split('\n').filter(item => item.length !== 0),
                }
                console.log(lines.i1)
                console.log(lines.i2)
                let result = {};
                result.lines = [];
                for (let i = 0; i < lines.i1.length; i++) {
                    result.lines.push({
                        l1: lines.i1[i],
                        l2: lines.i2[i],
                        distance: levenshteinDistance(lines.i1[i], lines.i2[i])
                    })
                }
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
    // console.log(r)
    // const result1 = await extractText.recognize(image1);
    // console.log('log1')
    // const result2 = await extractText.recognize(image2);
    // console.log('log2')
    // const lines = {
    //     i1: r[0].data.text.split('\n'),
    //     i2: r[1].data.text.split('\n')
    // }
    // let result = {};
    // result.lines = [];
    // for (let i = 0; i < lines.i1.length; i++) {
    //     result.lines.push({
    //         l1: lines.i1[i],
    //         l2: lines.i2[i],
    //         distance: levenshteinDistance(lines.i1[i], lines.i2[i])
    //     })
    // }
    // console.log('log3')

    // // console.log(result);

    // return result;
}

// レーベンシュタイン距離の算出
function levenshteinDistance(str1, str2) {
    let r, c, cost,
        d = [];

    if ((str1 && !str2) || (!str1 && str2)) {
        return -1;
    }

    for (r = 0; r <= str1.length; r++) {
        d[r] = [r];
    }
    console.log(str2)
    for (c = 0; c <= str2.length; c++) {
        d[0][c] = c;
    }
    for (r = 1; r <= str1.length; r++) {
        for (c = 1; c <= str2.length; c++) {
            cost = str1.charCodeAt(r - 1) === str2.charCodeAt(c - 1) ? 0 : 1;
            d[r][c] = Math.min(d[r - 1][c] + 1, d[r][c - 1] + 1, d[r - 1][c - 1] + cost);
        }
    }
    return d[str1.length][str2.length];
}


// compare(sampleImage1, sampleImage2);

exports.compareText = compare;
