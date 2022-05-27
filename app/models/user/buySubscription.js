const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const buySubscriptionSchema = Schema({
    type: {
        type: String,
    },
    buy_count: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'delete'],
        default :'active'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    subscription_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subscription",
    },
    buy_date: {
       type: String,
       trim: true
    },
    payment_id: {
        type: String,
        trim: true
     },
    benefits: {
        type: String,
        trim: true,
        default: ""
    },
    expire_date: {
       type: String,
       trim: true
    },
    plan_meta: {
        type: { any: [Schema.Types.Mixed] }
     },
},{timestamps: true, versionKey: false, });
buySubscriptionSchema.plugin(mongoosePaginate);
const BuySubscriptionModel = mongoose.model('buysubscription', buySubscriptionSchema);
module.exports = BuySubscriptionModel;