const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/", (req, res) => {
  console.log("got");

  res.render("index");
});

//LIST MEMBERS PAGE API ROUTES (to display names of list we've created and to create/delete existing lists)

router.get("/lists", (req, res) => {
  console.log("got");
  //join to include all of EACH List Member's Items
  db.ListMember.findAll({
    //   include: [db.GiftItem],
  }).then((dbListMember) => {
    // res.json(dbListMember);

    const jsonObject = JSON.parse(JSON.stringify(dbListMember));

    const hbsObject = {
      listmembers: jsonObject,
    };
    console.log(jsonObject);
    res.render("lists", hbsObject);
  });
});


//POST request for adding a new List Member to list members <ul>
router.post("/lists", (req, res) => {
  console.log("adding");
  db.ListMember.create(req.body)
  .then((dbListMember) => {
      res.json(dbListMember);

      const jsonObject = JSON.parse(JSON.stringify(dbListMember))

      const hbsOjbect = {
        listmembers: jsonObject,
      };
      console.log(jsonObject);
      res.render("lists", hbsOjbect);
  })
})


//DELETE request to delete a list member from the Listmembers db

router.delete("/api/delete/:id", (req, res) => {
  console.log("deleting");
  db.ListMember.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbListMember) => {
    // res.json(dbListMember);

    const jsonObject = JSON.parse(JSON.stringify(dbListMember));

    const hbsObject = {
      listmembers: jsonObject,
    };
    console.log(jsonObject);
    res.render("lists", hbsObject);
  });
});

//DELETE request for gift items 
router.delete("/api/items/:id", (req, res) => {
  console.log("deleting");
  db.GiftItem.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbGiftItem) => {
    // res.json(dbListMember);

    const jsonObject = JSON.parse(JSON.stringify(dbGiftItem));

    const hbsObject = {
      listmembers: jsonObject,
    };
    console.log(jsonObject);
    res.render("members", hbsObject);
  });
});

//GIFT ITEMS PAGE API ROUTES (to display the gift items we've created and to create/delete existing gift items)
router.get("/items", (req, res) => {
  console.log("gift items");

  res.render("items");
});


//HTML route to generate etsy.handlebars via browser
router.get("/search", (req, res) => {
  console.log("got");

  res.render("etsy");
});

//HTML route to generate members.handlebars via browser
router.get("/members/:id", (req, res) => {
  console.log("got");
  console.log(req.params.id);
  db.ListMember.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.GiftItem],
  }).then((dbListMember) => {
    // res.json(dbListMember);

    const jsonObject = JSON.parse(JSON.stringify(dbListMember));

    const hbsObject = {
      listmember: jsonObject.GiftItems,
    };
    console.log(hbsObject);
    res.render("members", hbsObject);
  })
})

module.exports = router;
