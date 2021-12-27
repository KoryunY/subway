const { findById } = require('../model/CardHolder');
const CardHolder = require('../model/CardHolder');
const Station = require('../model/Station');
const mongoose = require("mongoose");

exports.getAll = function (req, res) {
    Station.find(function (err, doc) {
        if (err)
            res.send(err);
        res.send(doc);
    })
}

exports.createStation = function (req, res) {
    const station = new Station({
        name: req.body.name
    })
    station.save(function (err, doc) {
        if (err) {
            res.send(err)
        }
        res.send(doc)
    })
}
exports.updateStation = function (req, res) {
    const id = req.params.id;
    Station.findByIdAndUpdate(id, {
        preStat: req.body.preStat,
        nextStat: req.body.nextStat,
        checkOutPrice: req.body.checkOutPrice
    }, function (err, doc) {
        if (err) {
            res.send(err)
        }
        res.send(doc);
    })
}
exports.checkIn = function (req, res) {
    const sName = req.body.name;
    const cId = req.params.cId;

    Station.findOneAndUpdate({ name: sName }, { $push: { checkIns: cId } }, function (err, doc) {
        if (err) {
            return err;
        }
        return doc;
    });
    CardHolder.findByIdAndUpdate(cId, { checkInOut: true }, function (err, doc) {
        if (err) {
            res.send(err)
        }
        res.send(doc);
    })
}
exports.ccheckOut = function (req, res) {

}
exports.checkOut = async function (req, res) {
    const sName = req.body.name;
    const cId = req.params.cId;
    let payCheck = 0;
    try {
        let checkStat = await Station.findOneAndUpdate({ checkIns: cId }, {
            $pull: { checkIns: cId }
        }, { new: true });
        let checkOutStat = await Station.findOne({ name: sName });

        while (!checkStat._id.equals(checkOutStat._id)) {
            payCheck += checkStat.checkOutPrice;
            try {
                checkStat = await Station.findById(checkStat.nextStat).exec()
                if (checkStat == null)
                    break;
            } catch (err) {
                console.log(err)
            }
            if (checkStat.nextStat.equals(checkOutStat._id))
                payCheck += checkStat.checkOutPrice
        }
    } catch (err) {
        console.log(err)
    };

    console.log(payCheck);
    CardHolder.findById(cId, function (err, doc) {
        if (err)
            res.send(err);
        if (doc.balance < payCheck)
            res.send("Please reFill your balance" + (payCheck - cardHolder.balance) + " and try again")
        doc.balance -= payCheck;
        doc.save(function (err, doc) {
            if (err)
                res.send(err);
            res.send(doc);
        })
    });
};