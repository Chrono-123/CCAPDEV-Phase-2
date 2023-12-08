const mongoose = require('mongoose');
const labModel = require('../models/labSchema.js');
const reservationIdModel = require('../models/reservationIdSchema.js');
const reservationModel = require('../models/reservationSchema.js');
const seatModel = require('../models/seatSchema.js');
const userModel = require('../models/userSchema.js');

async function currentUserStudent(tempUserName){
    console.log(tempUserName);
    const currentUserStudent = await userModel.findOne({userName: tempUserName, userType: "studentUser"}).then(studentUser => {
        console.log("student", studentUser);
        if(studentUser == null)
            return false;
        else {
            return true;
        }
    });

    return currentUserStudent;
};

async function currentUserLabTech(tempUserName){
    const currentUserLabTech = await userModel.findOne({userName: tempUserName, userType: "labTechUser"}).then(labTechUser => {
        console.log("awman", labTechUser);
        if(labTechUser == null)
            return false;
        else {
            return true;
        }
    });

    return currentUserLabTech;
};

const reservationController = {
    reserveSlot: async function(req, res) {
        var tempUserName;

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
        });

        if(await currentUserStudent(tempUserName)) {
            res.render(`ReserveSlot`, {student: true});
        } else if(await currentUserLabTech(tempUserName)) {
            res.render(`ReserveSlot`, {labTech: true});
        }
    },
    
    reserve: async function(req, res) {
        const timeReserved = req.body.timeReserved;
        const finalTimeReserved = req.body.finalTimeReserved;
        const dateReserved = req.body.dateReserved;
        const labNumber = req.body.action;
        const seatNumber = req.body.seatNum;
        // const reservationDate = req.body.reservationDate;
        var tempUserName;
        var reservationId;
        // var timeReserved = reservation.timeReserved;
        console.log("i am reserved time", timeReserved);
        var parseInitialTime = timeReserved.split(":");
        var initialHours = parseInitialTime[0];
        var initialMinutes = parseInitialTime[1];
        var parseFinalTime = finalTimeReserved.split(":");
        var finalHours = parseFinalTime[0];
        var finalMinutes = parseFinalTime[1];

        

        console.log("in reserve");
        // console.log(req);
        console.log(timeReserved);
        console.log(finalTimeReserved);
        console.log(dateReserved);
        console.log(labNumber);
        console.log(seatNumber);
        // console.log(reservationDate);

        const reservationIdExists = await reservationIdModel.findOne({}).then(id => {
            console.log("awman", id);
            if(id == null)
                return false;
            else {
                reservationId = id.idCounter + 1;
                return true;
            }
        })

        console.log(reservationIdExists);

        if(reservationIdExists) {
            console.log("bruh", reservationId);
            await reservationIdModel.findOneAndUpdate({
                idCounter: reservationId,
            })
        } else {
            console.log("in here");
            const newReservationId = new reservationIdModel({});
            await newReservationId.save();
            await reservationIdModel.findOne({}).then(id => {
                console.log(id);
                reservationId = id.idCounter;
            })
        };

        console.log(reservationId);

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
            console.log(tempUserName);
        });

        if(await currentUserStudent(tempUserName)) {
            if(seatNumber != "" && dateReserved != "") {
                const seatExists = await reservationModel.findOne({seatNum: seatNumber, labNumber: labNumber}).then(seat => {
                    console.log(seat);
                    if(seat == null)
                        return false;
                    else {
                        return true;
                    }
                });
                
                const dateAndTimeExists = await reservationModel.findOne({timeReserved: timeReserved, dateReserved: dateReserved, labNumber: labNumber}).then(dateAndTime => {
                    if(dateAndTime == null)
                        return false;
                    else {
                        return true;
                    }
                });
    
                const finalDateAndTimeExists = await reservationModel.findOne({finalTimeReserved: finalTimeReserved, dateReserved: dateReserved, labNumber: labNumber}).then(dateAndTime => {
                    if(dateAndTime == null)
                        return false;
                    else {
                        return true;
                    }
                });
                
                console.log("in student");
                console.log(seatExists);
                if(finalHours - initialHours < 0) {
                    const error = "Invalid time!";
                    res.render(`ReserveSlot`, {labTech: true, error: error});
                } else if(((finalHours - initialHours == 0) && finalMinutes - initialMinutes <= 0)) {
                    const error = "Invalid time!";
                    res.render(`ReserveSlot`, {labTech: true, error: error});
                } else if(seatExists) {
                    const error = "Seat already exists!";
                    res.render(`ReserveSlot`, {labTech: true, error: error});
                } else if(dateAndTimeExists) {
                    const error = "Date or Time already exists!";
                    res.render(`ReserveSlot`, {labTech: true, error: error});
                } else if(finalDateAndTimeExists) {
                    const error = "Date or Time already exists!";
                    res.render(`ReserveSlot`, {labTech: true, error: error});
                } else {
                    const reservation = new reservationModel({
                        reservationNumber: reservationId,
                        name: tempUserName,
                        seatNum: req.body.seatNum,
                        timeReserved: req.body.timeReserved,
                        finalTimeReserved: req.body.finalTimeReserved,
                        dateReserved: req.body.dateReserved,
                        labNumber: labNumber,
                    });
            
                    const seat = new seatModel({
                        reservation: reservation,
                        seatNum: req.body.seatNum,
                        labNumber: labNumber
                    });
            
                    const lab = new labModel({
                        seats: seat,
                        labNumber: labNumber
                    });
            
                    const reservationSaved = 
                        reservation.save().then(val => {
                            console.log("Insert successful: ");
                            console.log(val);
                
                            seat.save().then(val => {
                                console.log("Insert successful: ");
                                console.log(val);
                
                                lab.save().then(val => {
                                    console.log("Insert successful: ");
                                    console.log(val);
                                    console.log(labNumber);
                                    return true;
                                }).catch(error => {
                                    //lab error
                                    console.log("Insert op error: " + error);
                                    return false;
                                });
                            }).catch(error => {
                                //seat error
                                console.log("Insert op error: " + error);
                                return false;
                            });
                        }).catch(error => {
                            //reservation error
                            console.log("Insert op error: " + error);
                            return false;
                        });
                    
                        console.log("im save", reservationSaved);
                    if(reservationSaved) {
                        res.redirect(`/lab/` + labNumber);
                    } else if(!reservationSaved) {
                        const error = "Reservation not saved!"
                        res.render(`ReserveSlot`, {labTech: true, error: error});
                    }
                }
            } else {
                const error = "Invalid Field!"
                res.render(`ReserveSlot`, {labTech: true, error: error});
            }
            
            // res.redirect(`/lab/` + labNumber);
        } else if(await currentUserLabTech(tempUserName)) {
            const userName = req.body.userName;
            if(seatNumber != "" && dateReserved != "" && userName != "") {
                const seatExists = await reservationModel.findOne({seatNum: seatNumber, labNumber: labNumber}).then(seat => {
                    console.log(seat);
                    if(seat == null)
                        return false;
                    else {
                        return true;
                    }
                });

                const dateAndTimeExists = await reservationModel.findOne({timeReserved: timeReserved, dateReserved: dateReserved, labNumber: labNumber}).then(dateAndTime => {
                    if(dateAndTime == null)
                        return false;
                    else {
                        return true;
                    }
                });

                const finalDateAndTimeExists = await reservationModel.findOne({finalTimeReserved: finalTimeReserved, dateReserved: dateReserved, labNumber: labNumber}).then(dateAndTime => {
                    console.log("in final date time");
                    if(dateAndTime == null)
                        return false;
                    else {
                        return true;
                    }
                });

                console.log(seatExists);
                console.log("in labtech");
                if(finalHours - initialHours < 0) {
                    const error = "Invalid time!";
                    res.render(`ReserveSlot`, {labTech: true, error: error});
                } else if(((finalHours - initialHours == 0) && finalMinutes - initialMinutes <= 0)) {
                    const error = "Invalid time!";
                    res.render(`ReserveSlot`, {labTech: true, error: error});
                } else if(seatExists) {
                    const error = "Seat already exists!";
                    res.render(`ReserveSlot`, {labTech: true, error: error});
                } else if(dateAndTimeExists) {
                    const error = "Date or Time already exists!";
                    res.render(`ReserveSlot`, {labTech: true, error: error});
                } else if(finalDateAndTimeExists) {
                    const error = "Date or Time already exists!";
                    res.render(`ReserveSlot`, {labTech: true, error: error});
                } else {
                    const reservation = new reservationModel({
                        reservationNumber: reservationId,
                        name: req.body.userName,
                        seatNum: req.body.seatNum,
                        timeReserved: req.body.timeReserved,
                        finalTimeReserved: req.body.finalTimeReserved,
                        dateReserved: req.body.dateReserved,
                        labNumber: labNumber
                    });
            
                    const seat = new seatModel({
                        reservation: reservation,
                        seatNum: req.body.seatNum,
                        labNumber: labNumber
                    });
            
                    const lab = new labModel({
                        seats: seat,
                        labNumber: labNumber
                    });
            
                    const reservationSaved = 
                        reservation.save().then(val => {
                            console.log("Insert successful: ");
                            console.log(val);
                
                            seat.save().then(val => {
                                console.log("Insert successful: ");
                                console.log(val);
                
                                lab.save().then(val => {
                                    console.log("Insert successful: ");
                                    console.log(val);
                                    console.log(labNumber);
                                    return true;
                                }).catch(error => {
                                    //lab error
                                    console.log("Insert op error: " + error);
                                    return false;
                                });
                            }).catch(error => {
                                //seat error
                                console.log("Insert op error: " + error);
                                return false;
                            });
                        }).catch(error => {
                            //reservation error
                            console.log("Insert op error: " + error);
                            return false;
                        });
                    
                        console.log("im save", reservationSaved);
                    if(reservationSaved) {
                        res.redirect(`/lab/` + labNumber);
                    } else if(!reservationSaved) {
                        const error = "Reservation not saved!"
                        res.render(`ReserveSlot`, {labTech: true, error: error});
                    }
                }
            } else {
                const error = "Invalid Field!"
                res.render(`ReserveSlot`, {labTech: true, error: error});
            }
        }
    },

    editSlot: async function(req, res) {
        var tempUserName;

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
        });

        if(await currentUserStudent(tempUserName)) {
            res.render(`EditSlot`, {student: true});
        } else if(await currentUserLabTech(tempUserName)) {
            res.render(`EditSlot`, {labTech: true});
        }
    },

    slotEdit: function(req, res) {
        console.log("in slot edit");
        const labNumber = req.body.lab;

        console.log(labNumber);
        res.redirect(`/editSlot/` + labNumber)
    },

    getSlotEdit: async function(req, res) {
        const labNumber = req.params.labNumber;
        var tempUserName;

        console.log("in get slot edit");
        console.log(labNumber);
        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
        });
        
        console.log(tempUserName);
        if(await currentUserStudent(tempUserName)) {
            console.log("in student");
            await reservationModel.find({name: tempUserName, labNumber: labNumber}).then(labReservations => {
                console.log(labReservations);
                labReservations = labReservations;

                console.log("this is the lab", labNumber);

                if(currentUserStudent(tempUserName)) {
                    res.render(`SlotEdit`, {labReservations: labReservations, labNumber: labNumber, student: true});
                } else if(currentUserLabTech(tempUserName)) {
                    res.render(`SlotEdit`, {labReservations: labReservations, labNumber: labNumber, labTech: true});
                }
            });
        } else if(await currentUserLabTech(tempUserName)) {
            console.log("in lab tech");
            await reservationModel.find({labNumber: labNumber}).then(labReservations => {
                console.log(labReservations);
                labReservations = labReservations;

                console.log("this is the lab", labNumber);

                if(currentUserStudent(tempUserName)) {
                    res.render(`SlotEdit`, {labReservations: labReservations, labNumber: labNumber, student: true});
                } else if(currentUserLabTech(tempUserName)) {
                    res.render(`SlotEdit`, {labReservations: labReservations, labNumber: labNumber, labTech: true});
                }
            });
        }
    },

    edit: async function(req, res) {
        const reservationNumber = req.body.reservationNumber;
        const userName = req.body.name;
        const seatNum = req.body.seatNum;
        const timeReserved = req.body.timeReserved;
        const dateReserved = req.body.dateReserved;
        const labNumber = req.body.labNumber; 
        var tempUserName;

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
            console.log(tempUserName);
        });

        console.log(tempUserName);
        console.log(reservationNumber);
        console.log(seatNum);
        console.log(dateReserved);
        console.log(labNumber);
        console.log("in get type");

        if(await currentUserStudent(tempUserName)) {
            try {
                console.log("inside1");
                await reservationModel.findOneAndUpdate({reservationNumber: reservationNumber, name: tempUserName, labNumber: labNumber}, {
                    seatNum: seatNum,
                    dateReserved: dateReserved,
                    timeReserved: timeReserved,
                    finalTimeReserved: req.body.finalTimeReserved,
                    labNumber: labNumber
                })
            } catch (err) {
                console.log(err)
            }
        } else if(await currentUserLabTech(tempUserName)) {
            try {
                console.log("inside1");
                await reservationModel.findOneAndUpdate({reservationNumber: reservationNumber, name: userName, labNumber: labNumber}, {
                    seatNum: seatNum,
                    dateReserved: dateReserved,
                    timeReserved: timeReserved,
                    finalTimeReserved: req.body.finalTimeReserved,
                    labNumber: labNumber
                })
            } catch (err) {
                console.log(err)
            }
        }
        res.redirect(`/editSlot`);
    },
    
    deleteSlot: function(req, res) {
        res.render(`LabTechDeleteSlot`);
    },

    slotDelete: function(req, res) {
        const labNumber = req.body.lab;

        res.redirect(`/deleteSlot/` + labNumber);
    },

    getSlotDelete: async function(req, res) {
        const labNumber = req.params.labNumber;

        await reservationModel.find({labNumber: labNumber}).then(labReservations => {
            console.log(labReservations);
            labReservations = labReservations;
            
            console.log("this is the lab", labNumber);
            res.render(`SlotDelete`, {labReservations: labReservations, labNumber: labNumber});
        });
    },

    delete: async function(req, res) {
        const today = new Date();
        const currentHours = today.getHours();
        const currentMinutes = today.getMinutes();
        const reservationNumber = req.body.reservationNumber;
        const userName = req.body.name;
        const seatNum = req.body.seatNum
        const labNumber = req.body.labNumber;
        var tempUserName;
        var reservationId;
        var seatId;
        // var timeReserved;

        const reservationIdExists = await reservationIdModel.findOne({}).then(id => {
            console.log("awman", id);
            if(id == null)
                return false;
            else {
                reservationId = id.idCounter - 1;
                return true;
            }
        })

        if(reservationIdExists) {
            console.log("bruh", reservationId);
            await reservationIdModel.findOneAndUpdate({
                idCounter: reservationId,
            })
        };

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
            console.log(tempUserName);
        });

        console.log("today is", today)
        console.log(currentHours);
        console.log(currentHours - 9);
        console.log(currentMinutes);
        console.log(reservationNumber);
        console.log(userName);
        console.log(seatNum);
        console.log(labNumber);
        console.log("in delete");

        const withinTen = await reservationModel.findOne({name: userName, labNumber: labNumber, reservationNumber: reservationNumber}).then(reservation => {
            console.log(reservation);
            var timeReserved = reservation.timeReserved;
            console.log("i am reserved time", timeReserved);
            parseTime = timeReserved.split(":");
            hours = parseTime[0];
            minutes = parseTime[1];
            console.log((currentHours - hours));
            if(currentHours > 12) {
                if((currentHours - hours - 12) == 0) {
                    if(((currentMinutes - minutes) >= 0) && ((currentMinutes - minutes) <= 10)) {
                        return true;
                    }
                } else {
                    return false
                }
                console.log(hours);
                console.log(minutes);
            } else {
                if((currentHours - 12) == 0) {
                    if(((currentMinutes - minutes) >= 0) && ((currentMinutes - minutes) <= 10)) {
                        return true;
                    }
                } else {
                    return false
                }
                console.log(hours);
                console.log(minutes);
            }
        });
        console.log(withinTen);

        if(withinTen) {
            try {
                console.log("inside1");
                // if()
                await reservationModel.findOneAndRemove({name: userName, labNumber: labNumber, reservationNumber: reservationNumber}).then(reservation => {
                    console.log("this is the reservation removed!!!", reservation);
                    reservationId = reservation._id;
                    console.log("i am reservation id");
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
    
                await seatModel.findOneAndRemove({reservation: reservationId, seatNum: seatNum, labNumber: labNumber}).then(seat => {
                    console.log("this is the seat removed!!!", seat);
                    seatId = seat._id;
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
    
                await labModel.findOneAndRemove({seats: seatId, labNumber: labNumber}).then(lab => {
                    console.log("this is the lab data removed!!!", lab);
                }).catch(error => {
                    console.log("Insert op error: " + error);
                });
            } catch (err) {
                console.log(err)
            }
    
            res.redirect(`/deleteSlot`);
        } else {
            await reservationModel.find({labNumber: labNumber}).then(labReservations => {
                console.log(labReservations);
                labReservations = labReservations;
                
                console.log("this is the lab", labNumber);
            
                const error = "Not within deleting range!";
                res.render(`slotDelete`, {labReservations: labReservations, labNumber: labNumber, error: error});
            });
        }
    },

    viewSlot: async function(req, res) {
        var tempUserName;

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
        });

        if(await currentUserStudent(tempUserName)) {
            res.render(`ViewSlot`, {student: true});
        } else if(await currentUserLabTech(tempUserName)) {
            res.render(`ViewSlot`, {labTech: true});
        }
    },

    slotView: function(req, res) {
        const labNumber = req.body.lab;

        res.redirect(`/viewSlot/` + labNumber);
    },

    getSlotView: async function(req, res) {
        const labNumber = req.params.labNumber;
        var tempUserName;

        console.log("in get slot view");

        await userModel.findOne({userType: "tempUser"}).then(user => {
            tempUserName = user.userName;
        });

        console.log(tempUserName);
        if(await currentUserStudent(tempUserName)) {
            await reservationModel.find({name: tempUserName, labNumber: labNumber}).then(labReservations => {
                console.log(labReservations);
            
                res.render(`SlotView`, {labReservations: labReservations, student: true});
            });
        } else if(await currentUserLabTech(tempUserName)) {
            await reservationModel.find({labNumber: labNumber}).then(labReservations => {
                console.log(labReservations);
            
                res.render(`SlotView`, {labReservations: labReservations, labTech: true});
            });
        }
    },
}

module.exports = reservationController;