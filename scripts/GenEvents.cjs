const fs = require("fs");
const data = require("../Events.json");

const GenEvents = () => {
  let template = fs.readFileSync(
    "scripts/templates/EventTemplate.html",
    "utf-8",
  );

  let t;
  data.Modules.forEach((m) => {
    if (m.draft) return;
    let moduleName = m.name;
    let moduleFileName = m.details.folderName;
    let moduleDescription = m.details.description;
    let moduleCard = m.details.card;
    let moduleGlass = m.details.glass;
    let moduleEvents = m.details.events;

    moduleEvents.forEach((e) => {
      if (e.draft) return;
      t = template;
      t = t.replaceAll("{#MODULENAME}", moduleFileName);
      t = t.replaceAll("{#EVENTNAME}", e.name);

      if (e.long_description == undefined) {
        t = t.replaceAll("{#EVENTDESCRIPTION}", e.description);
      } else {
        t = t.replaceAll("{#EVENTDESCRIPTION}", e.long_description);
      }

      if (e.reglink) {
        t = t.replaceAll("{#EVENTREGISTRATIONLINK}", e.reglink);
      }
      if (e.prize) {
        t = t.replaceAll("{#PRIZEPOOL}", e.prize);
      }

      if (e.isSponsored) {
        let s = "style='display: block; width: 200px;'";
        let sa = "style='margin: 0px auto 24px auto;'";
        // let hs = "style='height: 300px;'";
        t = t.replaceAll(
          "{#SPONSORLOGO}",
          "../../../assets/images/sponsors/" + e.sponsor.image,
        );
        t = t.replaceAll("{#SPONSORNAME}", e.sponsor.name);
        t = t.replaceAll("{#SPONSORTITLE}", e.sponsor.title);
        t = t.replaceAll("{#SPONSORLINK}", e.sponsor.link);
        // t = t.replaceAll("{#HEADERSTYLE}", hs);
        t = t.replaceAll("{#SPONSORSTYLE}", s);
        t = t.replaceAll("{#SPONSORLINKSTYLE}", sa);
      } else {
        let s = "style='display: none;'";
        t = t.replaceAll("{#SPONSORSTYLE}", s);
      }

      // Generate Structure Of Event
      const genStructEl = (name, description) => {
        return `<div>
                        <h4>${name}</h4>
                        <p>${description}</p>
                    </div>
                    `;
      };
      if (e.structure) {
        let struct = "";
        e.structure.forEach((s) => {
          struct += genStructEl(s.name, s.description);
        });
        t = t.replaceAll("{#EVENTSTRUCTURE}", struct);
      }

      let notesLi = ``;
      e.note.forEach((n) => {
        notesLi += `<li>${n}</li>
          `;
      });
        let notesUl = `<ol>${notesLi}<ol>`;
        
        t = t.replaceAll("{#EVENTNOTE}", notesUl)
      // Generate Rules Of Event
      const genLi = (r) => {
        return `<li>${r}</li>`;
      };
      let liList = "";
      if (e.rules) {
        e.rules.forEach((r) => {
          liList += genLi(r);
        });
        t = t.replaceAll("{#EVENTRULES}", liList);
      }

      // Generate FAQs Of Event
      const genFAQ = (q, a) => {
        return `<div>
                        <h4>${q}</h4>
                        <p>${a}</p>
                    </div>
                    <span></span>
                    `;
      };
      if (e.faqs) {
        let faqs = "";
        for (let i = 0; i < e.faqs.q.length; i++) {
          faqs += genFAQ(e.faqs.q[i], e.faqs.a[i]);
        }
        t = t.replaceAll("{#EVENTFAQS}", faqs);
      }

      let fn = "events/" + moduleFileName + "/" + e.folderName + "/";

      fs.mkdirSync(fn, {
        recursive: true,
      });

      fs.writeFileSync(fn + "index.html", t);
      console.log(fn + "index.html");
    });
  });
};
module.exports = GenEvents;
