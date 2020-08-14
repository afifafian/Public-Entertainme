const db = require('../config/mongo');
const Series = db.collection("series");
const { ObjectID } = require("mongodb");

class SeriesModel {
    static findAll () {
        return Series.find().toArray()
    }

    static findOne(id) {
        return Series.findOne({ _id: ObjectID(id) });
    }
    
    static insertOne(newSeries) {
        return Series.insertOne(newSeries);
    }
     
    static findOneAndUpdate(id, updatedSeries) {
        return Series.findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: updatedSeries },
            { returnOriginal: false, }
        );
    }
    
    static findOneAndDelete(id) {
        return Series.findOneAndDelete({ _id: ObjectID(id) });  
    }
}

module.exports = SeriesModel