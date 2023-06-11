const BaseController = require("./BaseController.js");
const path = require('path');
class UploadController extends BaseController {

    uploadKonten = async (req, res) => {
        const { namaFoto, deskFoto, foto } = req.body;
        if (req.file == null) {
            var pesan = {
                messages: "Mohon upload foto produk"
            };
            return res.status(200).json(pesan)
        }
        const filePath = req.file.path;
        var isGambar = path.basename(filePath);
        let data = {
            namaFoto: namaFoto,
            deskFoto: deskFoto,
            foto: isGambar
        }
        this.foto.save(data);
        let response = {
            status: 200,
            messages: "Success Upload",
            data: data
        };
        return res.status(200).json(response);
    }

    getKonten = async (req, res) => {
        let konten = await this.foto.getResult();
        let respon = {
            "data": konten
        }
        res.status(200).json(respon);
    }

    cariKonten = async (req, res) => {
        const { name } = req.body;
        let konten = await this.foto.whereRaw(`namaFoto like "%${name}%"`).getResult();
        let respon = {
            "data": konten
        }
        res.status(200).json(respon);
    }

}


module.exports = UploadController;