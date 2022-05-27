var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var stateSchema = new Schema({
    
    name: {
      type: String,
      default: ""
    },
    
   
   }, { versionKey: false, timestamps:true });

stateSchema.plugin(mongoosePaginate);
let stateModel = mongoose.model('state', stateSchema);
module.exports = stateModel;