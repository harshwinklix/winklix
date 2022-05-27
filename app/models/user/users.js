var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var UsersSchema = new Schema({
  id: {
    type: Number,
    require: true
  },
  type:{
    type: String,
    trim: true,
    require: true
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    default: ""
    // require: true
  },
  phone: {
    type: Number,
    trim: true,
    default:""
  },
  password: {
    type: String,
    trim: true,
  },
  otp: {
    type: Number,
    default: 0
  },
  is_verified_otp: {
    type: Number,
    values: [0, 1],
    default: 0
  },
  profile_completion: {
    type: Number,
    values: [0, 1],
    default: 0
  },
  fabricator_profile: {
    type: Number,
    values: [0, 1],
    default: 0
  },
  address: {
    type: String,
    trim: true,
    default:""
  },
  pincode: {
    type: String,
    trim: true,
    default:""
  },
  city: {
    type: String,
    trim: true,
    default:""
  },
  state: {
    type: String,
    trim: true,
    default:""
  },
  country: {
    type: String,
    trim: true,
    default:""
  },
  image_type: {
      type: String,
      enum: ['name', 'url'],
      default:"url"
    },
  image: {
    type: String,
    trim: true,
    default:""
  },  
  notification_count: {
    type: Number,
    default:0
  },
  imei: {
    type: String,
    default:""
  },
  deviceToken: {
    type: String,
    default:""
  },
  
  status: {
    type: Number,
    values: [1, 0],
    default: '1'
  },
  is_verified: {
    type: Number,
    values: [0, 1],
    default: 1
  },
  created_by: {
    type: Number,
    default: 0
  },
  created_time: {
    type: String
  },
  reference_id:{
     type: String,
    default: ""
  },
  last_location: {
    type: String,
    trim: true,
  },
  last_location_time: {
    type: String,
    trim: true,
    default:""
  },
  
  lat: {
    type: String,
    trim: true,
    default:""
  },
  lng: {
    type: String,
    trim: true,
    default:""
  },
  complete_address_: {
    type: String,
    trim: true,
    default:""
  },
  state_: {
    type: String,
    trim: true,
    default:""
  },
  city_: {
    type: String,
    trim: true,
    default:""
  },
  pincode_: {
    type: String,
    trim: true,
    default:""
  },
  is_logged_out: {
    type: Number,
    values: [0, 1],
    default: '0'
  },
  device_type:  {
    type: String,
    default: ""
  },
  product_id: {
    type: Number,
    default: 0
  },
  winning_date: {
    type: String,
    trim: true,
  },
  modified_by: {
    type: Number,
    default: 0
  },
  modified_time: {
    type: String,
    default: ""
  }
}, { timestamps: true });
UsersSchema.plugin(mongoosePaginate);
let UsersModel = mongoose.model('app_users', UsersSchema);
UsersModel.createIndexes();
module.exports = UsersModel;