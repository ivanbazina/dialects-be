const router = require('express').Router();
const readXlsxFile = require('read-excel-file/node');

router.get('/', function(req, res) {
    res.send('Dialects Page');
});

router.get('/list', function(req, res) {
    let jsonRsp = {
        data: {}
    };

    readXlsxFile('docs/data.xlsx').then((rows) => {
        jsonRsp.data = rows;
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(jsonRsp));
    });
});

router.get('/list/:max', function(req, res) {
    let jsonRsp = {
        data: {}
    };

    readXlsxFile('docs/data.xlsx').then((rows) => {
        let max = req.params.max;
        (rows.length > max) ? jsonRsp.data = rows.slice(0, max) : jsonRsp.data = rows;
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(jsonRsp));
    });
});

module.exports = router;