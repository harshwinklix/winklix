var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var cmsSchema = new Schema({
    
    description: {
      type: String,
      default: ""
    },
    
   
   }, { versionKey: false, timestamps:true });

cmsSchema.plugin(mongoosePaginate);
let CmsModel = mongoose.model('about_us', cmsSchema);
module.exports = CmsModel;