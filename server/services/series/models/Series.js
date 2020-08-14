const db = require('../config/mongo');
const Series = db.collection("series");
const { ObjectID } = require("mongodb");

class SeriesModel {
    static findAll () {
        return Series.find().toArray()
    }

    static findById(id) {
        return Series.findOne({ _id: ObjectID(id) });
    }
    
    static create(newSeries) {
        return Series.insertOne(newSeries);
    }
     
    static update(id, updatedSeries) {
        return Series.findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: updatedSeries },
            { returnOriginal: false, }
        );
    }
    
    static destroy(id) {
        return Series.findOneAndDelete({ _id: ObjectID(id) });  
    }
}

module.exports = SeriesModel