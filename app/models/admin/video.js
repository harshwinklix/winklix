var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var videoSchema = new Schema({
    
    url: {
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

videoSchema.plugin(mongoosePaginate);
let videoModel = mongoose.model('videos', videoSchema);
module.exports = videoModel;