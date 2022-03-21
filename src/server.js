require("./config/db");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PersonModel = require("./schemas/PersonSchema");

// app.get("/", (req, res) => {});

//Create Many Records with model.create()
const createPeople = async (peoples) => {
  await PersonModel.create(peoples);
};

//Create and Save a Record of a Model:
const create = () => {
  //   app.post("/create", (req, res) => {
  //   const name = req.body.name;
  //   const job = req.body.job;
  //   const age = req.body.age;
  //   const favoriteFoods = req.body.favoriteFoods;

  const user = new PersonModel({
    name: "Tapha",
    job: "Do stuff",
    age: 27,
    favoriteFoods: ["hamburger", "burritos"],
  });
  user.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  //   });
};
// create();

//Use model.find() to Search Your Database
const find = (name) => {
  PersonModel.find({ name: name }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOne = (food) => {
  PersonModel.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

//Use model.findById() to Search Your Database By _id
const findById = (id) => {
  PersonModel.findById(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};
//findById("62387306690092bdd63e6f9f");

//Perform Classic Updates by Running Find, Edit, then Save
const update = (id) => {
  PersonModel.findById(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.favoriteFoods.push("hamburger");
      data.save();
      console.log(data);
    }
  });
};
// update("62387306690092bdd63e6f9f");

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findOneAndUpdate = (name) => {
  PersonModel.findOneAndUpdate(
    { name: name },
    { age: 20 },
    { new: true }, //this make the function return the newly updated document instead of the older one
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
};

//Delete One Document Using model.findByIdAndRemove
const findOneAndRemove = (id) => {
  PersonModel.findOneAndRemove(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

//MongoDB and Mongoose - Delete Many Documents with model.remove()
const remove = (name) => {
  PersonModel.remove({ name: name }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

//Chain Search Query Helpers to Narrow Search Results
const narrowSearch = () => {
  PersonModel.find({ favoriteFoods: "burritos" })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
};
narrowSearch();

app.listen(8080, () => {
  console.log("Ok");
});
