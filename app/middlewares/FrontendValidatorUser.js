// const {
//     check,
//     validationResult
// } =  require('express-validator');

class FrontEntValidator {
    constructor() {
        return {
            signUp: this.signUp.bind(this),
            signUpStep2: this.signUpStep2.bind(this),
            verifyOtp: this.verifyOtp.bind(this),
            fabricator_signup_step2: this.fabricator_signup_step2.bind(this),
            login: this.login.bind(this),
            home: this.home.bind(this),
            updateProfile: this.updateProfile.bind(this),
            submitReferral: this.submitReferral.bind(this),
            verifyforgot: this.verifyforgot.bind(this),
            setForgotPass: this.setForgotPass.bind(this),
            chekUserName: this.chekUserName.bind(this),
            chekRedditUserName: this.chekRedditUserName.bind(this),
            resetPassword: this.resetPassword.bind(this)
        }
    }
    async _validationErrorsFormat(req) {
        var errors = req.validationErrors();
        if (errors) {
            var response = [];
            var temp = [];
            errors.forEach(function (err) {
                // check for duplicate error message
                if (temp.indexOf(err.param) == -1) {
                    response.push(err.msg);
                }
                temp.push(err.param);
            });
            return response;
        }
    }

    
    async signUp(req, res, next) {
        // return next();
        // console.log("request.body", req.body)
       
            if (Object.keys(req.body).length <= 16) {
                req.checkBody({
                    PHONE: {
                        notEmpty: true,
                        matches: {
                            // more than one options must be passed as arrays
                            options: /^[0-9]{10,10}$/i,
                            // errorMessage: 'Mobile number should contain minimum 10 number'
                            errorMessage: { "field_name": "number", "error_msg": 'Mobile number should contain 10 digits' },
                        },
                        errorMessage: { "field_name": "number", "error_msg": 'Contact Number is required' },
                    },
                    TYPE: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'TYPE is required' },
                    },
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        
        }
    }
    async fabricator_signup_step2(req, res, next) {
        // return next();
        // console.log("request.body", req.body)
       
            if (Object.keys(req.body).length <= 20) {
                req.checkBody({
                    PHONE: {
                        notEmpty: true,
                        matches: {
                            // more than one options must be passed as arrays
                            options: /^[0-9]{10,10}$/i,
                            // errorMessage: 'Mobile number should contain minimum 10 number'
                            errorMessage: { "field_name": "number", "error_msg": 'Mobile number should contain 10 digits' },
                        },
                        errorMessage: { "field_name": "number", "error_msg": 'Contact Number is required' },
                    },
                    CUSTOMER_ID: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Customer id is required' },
                    },
                    FABRICATOR_NAME: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Fabricator name is required' },
                    },
                    STORE_NAME: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Store name is required' },
                    },
                    LOCATION: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Location is required' },
                    },
                    LAT: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Latitude is required' },
                    },
                    LNG: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Longitude is required' },
                    },
                    COMPLETE_ADDRESS: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Complete address is required' },
                    },
                    CITY: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'City is required' },
                    },
                    PINCODE: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Pincode is required' },
                    },
                    USING_APOLLO: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Using apollo is required' },
                    },
                    EXPERIENCE: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Experience is required' },
                    },
                    PROFILE_IMAGE: {
                        notEmpty: true,
                        errorMessage: { "field_name": "TYPE", "error_msg": 'Profile image is required' },
                    },
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        
        }
    }
    async signUpStep2(req, res, next) {
        // return next();
        // console.log("request.body", req.body)
       
            if (Object.keys(req.body).length <= 16) {
                req.checkBody({
                    NAME: {
                        notEmpty: true,
                        errorMessage: { "field_name": "NAME", "error_msg": 'Name is required' },
                    },
                    IMEI: {
                        notEmpty: true,
                        errorMessage: { "field_name": "IMEI", "error_msg": 'Imei is required' },
                    },
                    PASSWORD: {
                        notEmpty: true,
                        errorMessage: { "field_name": "PASSWORD", "error_msg": 'Password is required' },
                    },
                    ID: {
                        notEmpty: true,
                        errorMessage: { "field_name": "ID", "error_msg": 'ID is required' },
                    },
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        
        }
    }
    async login (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=4) {
                req.checkBody({
                    APP_KEY: {
                        notEmpty: true,
                        errorMessage: { "field_name": "app_key", "error_msg": 'App key is required' },
                    },
                    PHONE: {
                        notEmpty: true,
                        errorMessage: { "field_name": "phone", "error_msg": 'Phone is required' },
                    },
                    PASSWORD: {
                        notEmpty: true,
                        errorMessage: { "field_name": "password", "error_msg": 'Password is required' },
                    },
                    IMEI: {
                        notEmpty: true,
                        errorMessage: { "field_name": "imei", "error_msg": 'Imei is required' },
                    },
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 420, STATUS: "FAILURE", MESSAGE: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 420, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    async home (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=4) {
                req.checkBody({
                    APP_KEY: {
                        notEmpty: true,
                        errorMessage: { "field_name": "app_key", "error_msg": 'App key is required' },
                    },
                    IMEI: {
                        notEmpty: true,
                        errorMessage: { "field_name": "imei", "error_msg": 'Imei is required' },
                    },
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 420, STATUS: "FAILURE", MESSAGE: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 420, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    async updateProfile (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=29) {
                req.checkBody({
                    user_id: {
                        notEmpty: true,
                        errorMessage: { "field_name": "user_id", "error_msg": 'user_id is required' },
                    },
                    social_type: {
                        notEmpty: true,
                        errorMessage: { "field_name": "social_type", "error_msg": 'social_type is required' },
                    }
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    
    ////////////////////////////////////////////////////////////////////////end ba panal/////////////////////////////////////////////
    async verifyOtp (req, res, next) {

        // return next();
        if (Object.keys(req.body).length <=3) {
                req.checkBody({
                    ID: {
                        notEmpty: true,
                        errorMessage: { "field_name": "ID", "error_msg": 'ID is required' },
                    },
                    OTP: {
                        notEmpty: true,
                        matches: {
                            // more than one options must be passed as arrays
                            options: /^[0-9]{4,4}$/i,
                            // errorMessage: 'Mobile number should contain minimum 10 number'
                            errorMessage: { "field_name": "OTP", "error_msg": 'Otp should contain 4 number' },
                        },
                        errorMessage: { "field_name": "otp", "error_msg": 'Otp is required' },
                    },
                    
                })

           

            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    async verifyforgot (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=2) {
                req.checkBody({
                    email: {
                        notEmpty: true,
                        // matches: {
                        //     // more than one options must be passed as arrays
                        //     options: /^[0-9]{6,10}$/i,
                        //     // errorMessage: 'Mobile number should contain minimum 10 number'
                        //     errorMessage: { "field_name": "number", "error_msg": 'Mobile number should contain minimum 6 number' },
                        // },
                        errorMessage: { "field_name": "email", "error_msg": 'Email is required' },
                    },
                    otp: {
                        notEmpty: true,
                        matches: {
                            // more than one options must be passed as arrays
                            options: /^[0-9]{4,4}$/i,
                            // errorMessage: 'Mobile number should contain minimum 10 number'
                            errorMessage: { "field_name": "otp", "error_msg": 'Otp should contain minimum 4 number' },
                        },
                        errorMessage: { "field_name": "otp", "error_msg": 'Otp is required' },
                    },
                    
                })

           

            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    async setForgotPass (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=2) {
                req.checkBody({
                    email: {
                        notEmpty: true,
                        // matches: {
                        //     // more than one options must be passed as arrays
                        //     options: /^[0-9]{6,10}$/i,
                        //     // errorMessage: 'Mobile number should contain minimum 10 number'
                        //     errorMessage: { "field_name": "number", "error_msg": 'Mobile number should contain minimum 6 number' },
                        // },
                        errorMessage: { "field_name": "email", "error_msg": 'Email is required' },
                    },
                    newPassword: {
                        notEmpty: true,
                        errorMessage: { "field_name": "newPassword", "error_msg": 'newPassword is required' },
                    },
                    
                })

           

            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
   
    async submitReferral (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=3) {
                req.checkBody({
                    referral_code: {
                        notEmpty: true,
                        errorMessage: { "field_name": "referral_code", "error_msg": 'referral_code is required' },
                    },
                    username: {
                        notEmpty: true,
                        errorMessage: { "field_name": "username", "error_msg": 'username is required' },
                    },
                    email: {
                        notEmpty: true,
                        errorMessage: { "field_name": "email", "error_msg": 'email is required' },
                    }
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    ///////////////////////////////////////////////////////////
    async chekUserName (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=2) {
                req.checkBody({
                    username: {
                        notEmpty: true,
                        errorMessage: { "field_name": "username", "error_msg": 'username is required' },
                    }
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    async chekRedditUserName (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=2) {
                req.checkBody({
                    reddit_username: {
                        notEmpty: true,
                        errorMessage: { "field_name": "reddit_username", "error_msg": 'reddit_username is required' },
                    }
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }

    async resetPassword (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=3) {
                req.checkBody({
                    oldPassword: {
                        notEmpty: true,
                        errorMessage: { "field_name": "oldPassword", "error_msg": 'oldPassword is required' },
                    },
                    newPassword: {
                        notEmpty: true,
                        errorMessage: { "field_name": "newPassword", "error_msg": 'newPassword is required' },
                    },
                    _id: {
                        notEmpty: true,
                        errorMessage: { "field_name": "_id", "error_msg": '_id is required' },
                    }

                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }


    
}

module.exports = new FrontEntValidator();