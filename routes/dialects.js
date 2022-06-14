const router = require('express').Router();
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './docs');
    },
    filename: function (req, file, callback) {
        callback(null, 'data.xlsx');
    }
});

const upload = multer({ storage: storage }).single('file');



router.get('/', function (req, res) {
    res.send('Dialects Page');
});

router.get('/list', function (req, res) {
    let jsonRsp = {
        data: {}
    };

    readXlsxFile('docs/data.xlsx').then((rows) => {
        jsonRsp.data = rows;
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(jsonRsp));
    });
});

router.get('/list/:max', function (req, res) {
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

router.post('/upload', function (req, res) {
    let jsonRsp = {
        data: {}
    };

    upload(req, res, function (err) {
        res.set('Content-Type', 'application/json');
        if (err) {
            jsonRsp.data = { status: "Error uploading file" };
        } else {
            jsonRsp.data = { status: "File is uploaded" };
        }
        res.send(JSON.stringify(jsonRsp));
    });
});

module.exports = router;