const commenFunction = require('../common/Common')
const UsersModel = require('../../models/user/users');
const stateModel = require('../../models/user/state')
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
class State {
    constructor() {
        return {
            
            get: this.get.bind(this),
            
        }
    }

    
    async get(req, res) {
        try {
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 },
                lean: true,
                // select: 'name user_type minner_Activity createdAt',
            }
            let query = {}
            // if (req.body.searchData) {
            //     query = {
            //         user_type: 'user',
            //         $or: [{ email: { $regex: req.body.searchData, $options: "i" } },
            //         { name: { $regex: req.body.searchData, $options: "i" } },
            //         { username: { $regex: req.body.searchData, $options: "i" } }]
            //     }
            // }
            let getUser = await stateModel.paginate(query, options)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: getUser })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    
}



module.exports = new State();