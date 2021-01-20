const db = require("../models");

module.exports = (app) => {
  //api call to call all of the records in the list_members db
  app.get("/api/lists", (req, res) => {
    //join to include all of EACH List Member's GiftItems
    db.ListMember.findAll({
      include: [db.GiftItem],
    }).then((dbListMember) => {
      res.json(dbListMember);
    });
  });

  //api call to call one record in the list_members db
  app.get("/api/lists/:id", (req, res) => {
    //join to include all of ONE of the List Member's Items
    db.ListMember.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.GiftItem],
    }).then((dbListMember) => res.json(dbListMember));
  });

  // api call to post (create) one record in the list_members db
  app.post("/api/lists", (req, res) => {
    db.ListMember.create(req.body).then((dbListMember) =>
      res.json(dbListMember)
    );
  });

  // api call to delete (delete) one record in the list_members db
  app.delete("/api/lists/:id", (req, res) => {
    db.ListMember.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbListMember) => res.json(dbListMember));

  });
};
