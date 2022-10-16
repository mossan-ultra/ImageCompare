const express = require("express");

const router = express.Router();

// POSTリクエスト
router.post('/', (req, res) => {
    res.status(200).json({ message: "登録しました" });
});
router.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/pages/imgcompare.html')
});

// export default router;
