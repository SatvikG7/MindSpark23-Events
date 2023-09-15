const GenModules = require("./GenModules.cjs");
const GenEvents = require("./GenEvents.cjs");
const fs = require("fs");
const fse = require("fs-extra");

// if events folder exists delete it
if (fs.existsSync("events")) {
  fs.rmdirSync("events", { recursive: true });
}

// Create events folder if not exists
if (!fs.existsSync("events")) {
  fs.mkdirSync("events");
}

// Copy index.html to events folder
fs.copyFileSync("index.html", "events/index.html");

const mkDir = (path) => {
  fs.mkdirSync(path);
};
const cpFile = (from, to) => {
  fs.copyFileSync(from, to);
};

let dirs = [
  "events/styles",
  "events/styles/main",
  "events/styles/module",
  "events/styles/events",
  "events/lib",
];

dirs.forEach((dir) => {
  mkDir(dir);
});

cpFile("styles/events/styles.css", "events/styles/events/styles.css");
cpFile("styles/main/main.css", "events/styles/main/main.css");
cpFile("styles/main/card.css", "events/styles/main/card.css");
cpFile("styles/module/styles.css", "events/styles/module/styles.css");

cpFile("lib/main.js", "events/lib/main.js");
cpFile("lib/gradient.js", "events/lib/gradient.js");
cpFile("lib/splide.min.js", "events/lib/splide.min.js");
cpFile("styles/main/splide.min.css", "events/styles/main/splide.min.css");

GenModules();
GenEvents();

fse.copy("assets/", "events/assets", (err) => {
  if (err) {
    console.error("Error copying directory:", err);
  } else {
    console.log("Directory copied successfully!");
  }
});
