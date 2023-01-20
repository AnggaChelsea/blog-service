const userModel = require("../../models/users/user");

class Profile {
    static async getProfile(req, res) {
        const profile = await userModel.findById(req.params.id);
        if (!profile) {
            res.status(400).json({
                message: "Profile not found",
            })
        }
        res.status(200).json({
            message: "Successfully get profile",
            dataAll: profile,
            dataProfile: {
                'Nama': profile.name,
                'Email': profile.email,
                'Alamat': profile.alamat,
                'Tanggal Lahir': profile.tanggalLahir,
                'Jenis Kelamin': profile.jenisKelamin,
                'Number Phone': profile.numberphone ? profile.numberphone : '',
                'Tinggi Badan': profile.tinggiBadan !== 0 ? profile.tinggiBadan : '',
                'Berat Badan': profile.beratBadan  !== 0 ? profile.beratBadan : '',
            },
            image: profile.image
        })
    }
    static async follow(req, res) {
        const userId = req.params.id
        const followersId = req.params.body
        const user = await userModel({
            _id: userId
        })
        const follower = await userModel({
            _id: followersId
        })
        user.followers.push(follower._id)
        await user.save()
        res.status(200).json({
            message: "Successfully follow",
            data: user
        })
    }
}
module.exports = Profile;