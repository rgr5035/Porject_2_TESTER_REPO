const db = require("../models");


  //GIFT ITEMS API CALL DO NOT TOUCH THESE
  module.exports = (app) => {
  
  // api call to post (create) one record in the gift_items db
  app.post("/api/items", (req, res) => {
    db.GiftItem.create(req.body).then((dbGiftItem) => res.json(dbGiftItem));
  });

};
