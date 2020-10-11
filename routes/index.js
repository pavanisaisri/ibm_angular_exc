var express = require('express');
var router = express.Router();
var service = require("../services/orderService");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/saveToMongo', (req, res) => {
  service.saveToMongo(req.body)
      .then(data => {
          res.json(data)
      })
      .catch(err => {
          console.log(err);
          res.status(500);
          res.statusMessage = err.message;
          res.end();
      })
})
module.exports = router;
