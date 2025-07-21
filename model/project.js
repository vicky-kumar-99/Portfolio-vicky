const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    project : String,
    
})

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;