const controller = {
    getMain: function(req, res) {
        res.render(`main`);
    },

    redirectMain: function(req, res) {
        res.redirect(`/`);
    },

    checkUser: function(req, res) {
        const userName = req.body.user;
        const password = req.body.password;

        // if student
        res.redirect(`/home/` + user);
        // else if labTech
        // res.redirect(`/labTechHome/` + user);
    },

    getStudent: async function(req, res) {
        const userName = req.params.user;
        // var password = req.params.password;

        const students = await studentModel.find({});

        try {
            response.send(students);
        } catch (error) {
            response.status(500).send(error);
        }

        res.render(`Home`, {email: email});
    },

    getLabTech: function(req, res) {
        const userName = req.params.user;
        // var password = req.params.password;

        res.render(`LabTechHome`, {email: email});
    },

    registrationType: function(req, res) {
        res.render(`RegistrationType`);
    },

    studentRegister: function(req, res) {
        res.render('Register.hbs');
    },

    labTechRegister: function(req, res) {
        res.render('LabTechRegister.hbs');
    },

    registerStudent: async function(req, res) {
        const student = new studentModel(req.body);

        try {
            await student.save();
            response.send(student);
        } catch (error) {
            response.status(500).send(error);
        }
    }
}

module.exports = controller;