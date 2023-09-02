const fs = require("fs");
const data = require("../Events.json");

let template = fs.readFileSync("scripts/templates/EventTemplate.html", "utf-8");

let t;
for (const module in data) {
    data[module].events.forEach((e) => {
        t = template;
        t = t.replaceAll("{#EVENTNAME}", e.name);
        t = t.replaceAll("{#EVENTDESCRIPTION}", e.description);
        fs.mkdirSync("Events/" + module, { recursive: true });
        let fn = "Events/" + module + "/" + e.fileName;
        fs.writeFileSync(fn, t);
        console.log(fn);
    });
}
