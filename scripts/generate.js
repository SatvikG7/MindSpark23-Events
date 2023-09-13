const GenModules = require("./GenModules.cjs");
const GenEvents = require("./GenEvents.cjs");
const fs = require("fs");
const fse = require("fs-extra");

// if dist folder exists delete it
if (fs.existsSync("dist")) {
  fs.rmdirSync("dist", { recursive: true });
}

// Create dist folder if not exists
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

// Copy index.html to dist folder
fs.copyFileSync("index.html", "dist/index.html");

const mkDir = (path) => {
  fs.mkdirSync(path);
};
const cpFile = (from, to) => {
  fs.copyFileSync(from, to);
};

let dirs = [
  "dist/styles",
  "dist/styles/main",
  "dist/styles/module",
  "dist/styles/events",
  "dist/lib",
];

dirs.forEach((dir) => {
  mkDir(dir);
});

cpFile("styles/events/styles.css", "dist/styles/events/styles.css");
cpFile("styles/main/main.css", "dist/styles/main/main.css");
cpFile("styles/main/card.css", "dist/styles/main/card.css");
cpFile("styles/module/styles.css", "dist/styles/module/styles.css");

cpFile("lib/main.js", "dist/lib/main.js");
cpFile("lib/gradient.js", "dist/lib/gradient.js");
cpFile("lib/splide.min.js", "dist/lib/splide.min.js");
cpFile("styles/main/splide.min.css", "dist/styles/main/splide.min.css");

GenModules();
GenEvents();

fse.copy("assets/", "dist/assets", (err) => {
  if (err) {
    console.error("Error copying directory:", err);
  } else {
    console.log("Directory copied successfully!");
  }
});
