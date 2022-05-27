var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var fabricatorSchema = new Schema({
    
    customer_id: {
      type: String,
      default: ""
    },
    fabricator_name: {
      type: String,
      default: ""
    },
    store_name: {
      type: String,
      default: ""
    },
	store_contact_no: {
      type: Number,
    trim: true,
    default:""
    }, 
    otp: {
      type: Number,
    trim: true,
    default:0
    },   
    is_verified_otp: {
      type: Number,
    trim: true,
    default:0
    },   
    location: {
      type: String,
      default: ""
    },
    lat: {
      type: Number,
      default: ""
    },
    lng: {
      type: Number,
      default: ""
    },
    distance: {
      type: Number,
      default: ""
    },
    complete_address: {
      type: String,
      default: ""
    },
    nearest_landmark: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    pincode: {
      type: Number,
      default: ""
    },
    using_apollo: {
      type: String,
      default: ""
    },
    retailer_dealer_name: {
      type: String,
      default: ""
    },
    experience: {
      type: String,
      default: ""
    },
    image_type: {
      type: String,
      enum: ['name', 'url'],
      default:"url"
    },
    visiting_card_image: {
      type: String,
      default: ""
    },
    profile_completion: {
      type: Number,
      default: 0
    },
    device_type: {
      type: String,
      enum: ['android', 'ios'],
      default: ""
    },
    last_location: {
      type: String,
      default: ""
    },
    last_location_time: {
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

fabricatorSchema.plugin(mongoosePaginate);
let fabricatorModel = mongoose.model('fabricators', fabricatorSchema);
module.exports = fabricatorModel;