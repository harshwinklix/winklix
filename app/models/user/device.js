var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var deviceSchema = new Schema({
    
    imei: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    deviceToken: {
      type: String,
      default: ""
    },
	notification_count: {
      type: Number,
      default: "0"
    },    
   	created_time: {
    type: String
  	}
   }, { versionKey: false, timestamps:true });

deviceSchema.plugin(mongoosePaginate);
let deviceModel = mongoose.model('device_tokens', deviceSchema);
module.exports = deviceModel;