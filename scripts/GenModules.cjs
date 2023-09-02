const fs = require("fs");
const data = require("../Events.json");

var template = fs.readFileSync(
    "scripts/templates/ModuleTemplate.html",
    "utf-8"
);
var li = fs.readFileSync("scripts/templates/CardTemplate.html", "utf-8");

// check if events directory is present if not create it
fs.readdir("Events/", (err, files) => {
    if (err) {
        console.log(err);
        fs.mkdir("Events/", (err) => {
            if (err) {
                console.log("Events directory does not exist.");
                console.log("Creating Events Directory...");
                // console.log(err);
            }
        });
    }
    // else {
    //     console.log("Events directory already exist.");
    //     console.log("Removing Events Directory...");
    //     fs.rmdir(
    //         "events/",
    //         // { recursive: true, force: true },
    //         (err) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 fs.mkdir("events/", (err) => {
    //                     if (err) {
    //                         console.log(err);
    //                     } else {
    //                         console.log("Created an Empty Events Directory...");
    //                     }
    //                 });
    //             }
    //         }
    //     );
    // }
});

for (const module in data) {
    // console.log(data[module]);
    const MODULE = module;
    const DESCRIPTION = data[module].description;
    let temp = template;
    temp = temp.replaceAll("{#MODULENAME}", MODULE);
    temp = temp.replace("{#DESCRIPTION}", DESCRIPTION);
    let fname = "Events/" + String(data[module].fileName);

    let list = "";

    data[module].events.forEach((e) => {
        let card = li;
        card = card.replaceAll("{#EVENTTITLE}", e.name);
        card = card.replaceAll(
            "{#MODULE}",
            data[module].fileName.split(".")[0]
        );
        card = card.replaceAll("{#EVENTDESCRIPTION}", e.description);

        card = card.replaceAll("{#EVENTFILENAME}", e.fileName);
        card = card.replaceAll("{#ICONPATH}", e.fileName.split(".")[0]);
        list += card;
    });

    temp = temp.replace("{#EVENTSLIST}", list);
    fs.writeFile(
        fname,
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
    console.log(fname);
}
