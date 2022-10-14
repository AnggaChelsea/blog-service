const phoneS = require('../../models/phone')
const verifPhone = require('../../helper/smsverif')
const accountSid = 'ACad0696755cd0669e8c4165a1e8a6bdec'; 
const authToken = '74940f0d26f25e42b5a3175f3485c186'; 
const client = require('twilio')(accountSid, authToken);

class PhoneController {
    static async regisPhone(req, res){
        const codeOtpConfirm = Math.floor(Math.random() * 1000000);
        const {phone, password} = req.body
        const userRegis = await new phoneS({
            phone,
            password,
            codeOtp: codeOtpConfirm
        })
        console.log(phone)
        if(!userRegis){
            res.status(500).json({message: 'server error'})
        }else{
            setTimeout(function(){
                verifPhone(phone, codeOtpConfirm)
            }, 5000)
            res.status(200).json({message: 'success code terkirim', data: userRegis})
        }
    }
}
module.exports = PhoneController