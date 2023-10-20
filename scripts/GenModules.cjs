const fs = require("fs");
const data = require("../Events.json");

const GenModules = () => {
  var template = fs.readFileSync(
    "scripts/templates/ModuleTemplate.html",
    "utf-8",
  );
  var li = fs.readFileSync("scripts/templates/CardTemplate.html", "utf-8");

  // check if events directory is present if not create it
  if (!fs.existsSync("events/")) {
    fs.mkdirSync("events/", (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  data.Modules.forEach((m) => {
    if (m.draft) return;
    let moduleName = m.name;
    let moduleFileName = m.details.folderName;
    let moduleDescription = m.details.description;
    let moduleEvents = m.details.events;
    let t = template;
    t = t.replaceAll("{#MODULENAME}", moduleName);
    t = t.replaceAll("{#MODULEDESCRIPTION}", moduleDescription);
    let folderName = "events/" + moduleFileName;
    let fileName = folderName + "/index.html";
    let list = "";

    moduleEvents.forEach((e) => {
      if (e.draft) return;
      let card = li;
      card = card.replaceAll("{#EVENTTITLE}", e.name);
      card = card.replaceAll("{#EVENTDESCRIPTION}", e.description);
      card = card.replaceAll("{#EVENTFILENAME}", e.folderName);
      card = card.replaceAll("{#EVENTICON}", e.folderName);
      list += card;
    });
    t = t.replaceAll("{#MODULEEVENTS}", list);

    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    fs.writeFileSync(
      fileName,
      t,
      {
        encoding: "utf8",
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      },
    );
    console.log(fileName);
  });
};

module.exports = GenModules;
