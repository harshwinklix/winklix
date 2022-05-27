var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var categorySchema = new Schema({
    name: {
      type: String,
      require: true,
      trim: true
    },
    hindi_name: {
      type: String,
      trim: true
    },
    tamil_name : {
      type: String,
      default: "",
      trim: true
    },
    telugu_name: {
      type: String,
      trim: true
    },
    kannada_name: {
      type: String,
      trim: true
    },
    mallayali_name: {
      type: String,
      trim: true
    },
    code: {
      type: String,
      trim: true
    },
    image_type: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    status: {
      type: Number,
      enum : [0, 1],
      default :"1"
    },
    created_time: {
    type: String
    },
    modified_time: {
    type: String
    },
   }, { versionKey: false, timestamps:true });

categorySchema.plugin(mongoosePaginate);
let CategoryModel = mongoose.model('categories', categorySchema);
module.exports = CategoryModel;