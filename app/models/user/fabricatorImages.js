var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var fabImageSchema = new Schema({
    
    fabricator_id: {
      type: String,
      default: ""
    },
    image_type: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
   	created_time: {
    type: String
  	}
   }, { versionKey: false, timestamps:true });

fabImageSchema.plugin(mongoosePaginate);
let fabImageModel = mongoose.model('fabricator_images', fabImageSchema);
module.exports = fabImageModel;