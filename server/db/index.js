//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Event = require("./models/Event");

//associations could go here!
Event.belongsTo(User, { foreignKey: "ownerId" }); //this lets a user create/edit their event
User.hasMany(Event, { foreignKey: "ownerId" });
//********** event_subsciption table for users ********* ***/  this lets a user subscribe to an event
Event.belongsToMany(User, {
  through: "event_subscription",
});
User.belongsToMany(Event, {
  through: "event_subscription",
});

module.exports = {
  db,
  models: {
    User,
    Event,
  },
};
