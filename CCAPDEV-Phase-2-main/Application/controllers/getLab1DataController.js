const lab1Model = require('../models/lab1Schema.js');

const lab1DataController = {
    getData: async function (req, res){
        const data = await lab1Model.find({},
            {name: 1,
            id: 1,
            numOfSeats: 1,
            dateReserved: 1});
            res.send(data);
    }
}

module.export = lab1DataController;