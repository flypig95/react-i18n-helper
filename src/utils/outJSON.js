const fs = require("fs");
const path = require("path");

const outJSON = ({ translateData, lang, outputPath }) => {
  let isExistFile = true;
  outputPath = path.resolve(process.cwd(), outputPath);
  const filePath = (_lang = "zh") => path.resolve(outputPath, `${_lang}.json`);

  try {
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }
    if (!fs.existsSync(filePath(lang))) {
      isExistFile = false;
    }
  } catch (err) {
    console.log(err);
  }

  const langData = isExistFile
    ? JSON.parse(fs.readFileSync(filePath(lang)))
    : {};

  translateData.forEach((item) => {
    const { id, dst, value } = item;
    if (!langData[id]) {
      const v = lang === "zh" ? value : dst;
      langData[id] = v.replace("\n", "").trim();
    }
  });

  fs.writeFileSync(filePath(lang), JSON.stringify(langData, "", "\t"));
};

module.exports = outJSON;
