const db = require("../models");

  module.exports = (app) => {
  

  //API Call to view the desired List Member and their gift items added  
  app.get('/api/members/:id', (req, res) => {
    const query = {};

    if (req.query.listmember_id) {
      query.ListMemberId =req.query.listmember_id;
    }

    db.GiftItem.findOne({
      where: query,
      include: [db.ListMember],
    }).then((dbGiftItem) => res.render("members", dbGiftItem));
  })
};