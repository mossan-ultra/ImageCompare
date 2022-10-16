const express = require("express");
const imageCompareRouter = require("./imgcompare");

const router = express.Router();

// v1以下のルーティング
router.use('/imgcompare', imageCompareRouter);

// export default router;
