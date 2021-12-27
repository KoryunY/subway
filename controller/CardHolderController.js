const CardHolder = require('../model/CardHolder');

exports.getAll = function (req, res) {
    CardHolder.find(function (err, doc) {
        if (err)
            res.send(err);
        res.send(doc);
    })
}

exports.addCardHolder = function (req, res) {
    const cardHolder = new CardHolder({
        name: req.body.name
    })
    cardHolder.save(function (err, doc) {
        if (err) {
            res.send(err)
        }
        res.send(doc)
    })
}

exports.addMoney = function (req, res) {
    const id = req.params.id;
    CardHolder.findByIdAndUpdate(id, { $inc: { balance: req.body.balance } }, function (err, doc) {
        if (err) {
            res.send(err)
        }
        res.send(doc);
    })
}