const db = require('../config/mongo');
const Movies = db.collection("movies");
const { ObjectID } = require("mongodb");

class MoviesModel {
    static findAll () {
        return Movies.find().toArray()
    }

    static findOne(id) {
        return Movies.findOne({ _id: ObjectID(id) });
    }
    
    static insertOne(newMovie) {
        return Movies.insertOne(newMovie);
    }
     
    static findOneAndUpdate(id, updatedMovie) {
        return Movies.findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: updatedMovie },
            { returnOriginal: false, }
        );
    }
    
    static findOneAndDelete(id) {
        return Movies.findOneAndDelete({ _id: ObjectID(id) });  
    }
}

module.exports = MoviesModel