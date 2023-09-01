const fs = require("fs");
const data = require("../Events.json");

let template = fs.readFileSync("scripts/templates/EventTemplate.html", "utf-8");

let t;
for (const module in data) {
    t = template;
    data[module].events.forEach((e) => {
        for (const n in e) {
            if (n !== "fileName") {
                t = t.replaceAll("{#EVENTNAME}", n);
            }
        }
        fs.mkdirSync("events/" + module, { recursive: true });
        let fn = "events/" + module + "/" + e.fileName;
        fs.writeFileSync(fn, t);
        console.log(fn);
    });
}
