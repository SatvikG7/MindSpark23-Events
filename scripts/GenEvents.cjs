const fs = require("fs");
const data = require("../Events.json");

let template = fs.readFileSync("scripts/templates/EventTemplate.html", "utf-8");

let t;
for (const module in data) {
    data[module].events.forEach((e) => {
        t = template;
        t = t.replaceAll("{#EVENTNAME}", e.name);
        t = t.replaceAll("{#EVENTDESCRIPTION}", e.description);
        let fn =
            "Events/" +
            String(data[module].fileName).split(".")[0] +
            "/" +
            String(e.fileName).split(".")[0] +
            "/";
        fs.mkdirSync(fn, {
            recursive: true,
        });

        fs.writeFileSync(fn + "index.html", t);
        console.log(fn + "index.html");
    });
}
