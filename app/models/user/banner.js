var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var bannerSchema = new Schema({
    
    name: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    image_type: {
      type: String,
      default: ""
    },
	status: {
    type: Number,
    values: [1, 0],
    default: '1'
  },   
   	created_time: {
    type: String
  	}
   }, { versionKey: false, timestamps:true });

bannerSchema.plugin(mongoosePaginate);
let bannerModel = mongoose.model('banners', bannerSchema);
module.exports = bannerModel;