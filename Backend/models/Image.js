const mongoose = require('mongoose');

const { Schema } = mongoose;


const imageSchema = new Schema({
    image:{
        type: String,
    }
},
   {
    timestamps: true,
    versionKey: false
   }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image