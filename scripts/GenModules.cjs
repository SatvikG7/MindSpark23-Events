const fs = require("fs");
const data = require("../Events.json");

var template = fs.readFileSync(
    "scripts/templates/ModuleTemplate.html",
    "utf-8"
);
var li = fs.readFileSync("scripts/templates/CardTemplate.html", "utf-8");

// check if events directory is present if not create it

if (!fs.existsSync("Events/")) {
    fs.mkdirSync("Events/", (err) => {
        if (err) {
            console.log(err);
        }
    });
}

for (const module in data) {
    // console.log(data[module]);
    const MODULE = module;
    const DESCRIPTION = data[module].description;
    let temp = template;
    temp = temp.replaceAll("{#MODULENAME}", MODULE);
    temp = temp.replace("{#DESCRIPTION}", DESCRIPTION);
    let folder_name = "Events/" + String(data[module].fileName).split(".")[0];
    let file_name = folder_name + "/" + "index.html";

    let list = "";

    data[module].events.forEach((e) => {
        let card = li;
        card = card.replaceAll("{#EVENTTITLE}", e.name);
        card = card.replaceAll(
            "{#MODULE}",
            data[module].fileName.split(".")[0]
        );
        card = card.replaceAll("{#EVENTDESCRIPTION}", e.description);

        card = card.replaceAll(
            "{#EVENTFILENAME}",
            e.fileName.split(".")[0] + "/"
        );
        card = card.replaceAll("{#ICONPATH}", e.fileName.split(".")[0]);
        list += card;
    });

    temp = temp.replace("{#EVENTSLIST}", list);

    if (!fs.existsSync(folder_name)) {
        fs.mkdirSync(folder_name, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    fs.writeFileSync(
        file_name,
        temp,
        {
            encoding: "utf8",
        },
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );
    console.log(file_name);
}
