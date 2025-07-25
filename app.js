const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const About = require("./model/about.js");
const Skill = require("./model/skill.js");
const Project = require("./model/project.js");
const methodOverride = require('method-override')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

main().then(() =>{
    console.log("connected to mongodb");
})
.catch((err) => {
    console.log("some error");
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/portfolio");
}


// const data1 = new Vicky({
//     about: "i am vicky kumar",
//     skills: "i know dsa with java",
//     project: "i make arbnb website"
// })

// data1.save().then((res) => {
//    console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// })

 app.get("/listings", (req,res) => {
     res.render("main.ejs");
 })

//  About page...

app.get("/about", async (req,res) => {
     
    let aboutdata = await About.find({});
    res.render("showabout.ejs", {aboutdata});
})

 app.get("/listings/about", (req,res) => {
      res.render("about.ejs");
 })

 app.post("/about", async (req, res) => {
        let {about} = req.body;
        newAbout = await new About({
            about: about
        });

        newAbout.save();
        res.redirect("/about");
        
 })

//  skill page ...

app.get("/skill", async (req,res) => {
     
    let skilldata = await Skill.find({});
    res.render("showskill.ejs", {skilldata});
})

app.get("/listings/skill", (req,res) => {
    res.render("skill.ejs");
})

app.post("/skill", async (req, res) => {
    let {skill} = req.body;
    newSkill = await new Skill({
        skill: skill
    });

    newSkill.save();
    res.redirect("/skill");
    
})

// project page ...

app.get("/project", async (req,res) => {
     
    let projectdata = await Project.find({});
    res.render("showproject.ejs", {projectdata}); 
})

app.get("/listings/project", (req,res) => {
    res.render("project.ejs");
})

app.post("/project", async (req, res) => {
    let {project} = req.body;
    newProject = await new Project({
        project: project
    });

    newProject.save();
    res.redirect("/project");
    
})

// for about edit page...

// Edit page ...

app.get("/aboutdata/:id/edit", async (req,res) => {
     const {id} = req.params;
     const aboutdata = await About.findById(id);
     res.render("aboutedit.ejs", {aboutdata});
})

// update data ....

app.put("/aboutdata/:id", async(req, res) => {
    let {id} = req.params;
    let {about : newAbout} = req.body;
    let updateAbout = await About.findByIdAndUpdate(id, 
        {about: newAbout}, {runValidators: true, new: true}
    );

    console.log(updateAbout);
    res.redirect("/about");
})

//  delete page...

app.delete("/aboutdata/:id/delete",  async(req, res) => {
    let {id} = req.params;
    let deleteAbout = await About.findByIdAndDelete(id);
    console.log(deleteAbout);
    res.redirect("/about");
})

// for skill edit page ... 

// Edit page ...

app.get("/skilldata/:id/edit", async (req,res) => {
    const {id} = req.params;
    const skilldata = await Skill.findById(id);
    res.render("skilledit.ejs", {skilldata});
})

// update data ....

app.put("/skilldata/:id", async(req, res) => {
   let {id} = req.params;
   let {skill : newSkill} = req.body;
   let updateSkill = await Skill.findByIdAndUpdate(id, 
       {skill: newSkill}, {runValidators: true, new: true}
   );

   console.log(updateSkill);
   res.redirect("/skill");
})

//  delete page...

app.delete("/skilldata/:id/delete",  async(req, res) => {
   let {id} = req.params;
   let deleteSkill = await Skill.findByIdAndDelete(id);
   console.log(deleteSkill);
   res.redirect("/skill");
})

// for project edit page ...
// Edit page ...

app.get("/projectdata/:id/edit", async (req,res) => {
    const {id} = req.params;
    const projectdata = await Project.findById(id);
    res.render("projectedit.ejs", {projectdata});
})

// update data ....

app.put("/projectdata/:id", async(req, res) => {
   let {id} = req.params;
   let {project : newProject} = req.body;
   let updateProject = await Project.findByIdAndUpdate(id, 
       {project: newProject}, {runValidators: true, new: true}
   );

   console.log(updateProject);
   res.redirect("/project");
})

//  delete page...

app.delete("/projectdata/:id/delete",  async(req, res) => {
   let {id} = req.params;
   let deleteProject = await Project.findByIdAndDelete(id);
   console.log(deleteProject);
   res.redirect("/project");
})

// for more details

app.get("/more-details", (req, res) => {
    res.render("more-details.ejs");
})



app.get("/", (req, res) => {
    //  res.redirect("/listings");
    res.render("main.ejs");
})

 const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});