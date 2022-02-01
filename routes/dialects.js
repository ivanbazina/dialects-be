const router = require('express').Router();

router.get('/', function(req, res) {
    res.send('Dialects Page');
});

module.exports = router;