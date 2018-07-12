var mongoose = require("mongoose");
var Pet = mongoose.model("Pet");

module.exports = {
  get_pets: function(request, response) {
    console.log("sorted is equal to:", request.params.sorted);
    if (request.params.sorted == "true") {
      Pet.find({})
        .sort("-type")
        .exec(function(err, pets) {
          if (err) {
            console.log("Oops! Something went wrong!");
            response.json({ message: "something went wrong" });
          } else {
            console.log("Here are all the pets and pets found.");
            response.json({ status: "success", pets: pets });
          }
        });
    } else {
      Pet.find({}, function(err, pets) {
        response.json({ pets: pets });
      });
    }
  },
  post_pets: function(request, response) {
    console.log("POST DATA", request.body);
    // Pet.find({name: request.body.name}, function(err, pet){
    //   console.log('pet',pet)
    //   if(pet.length > 0){
    //       res.json({message : "That name is taken"})
    //   }
    //   else{
    var pet = new Pet({
      name: request.body.name,
      type: request.body.type,
      description: request.body.description,
      skill1: request.body.skill1,
      skill2: request.body.skill2,
      skill3: request.body.skill3
    });
  // }
    console.log("this is your info", pet);
    pet.save(function(err) {
      if (err) {
        console.log("something went wrong", err);

        // for (var key in err.errors) {
        //   request.flash("registration", err.errors[key].message);
        // }
        response.json({message: "Error", error: err});
      } else {
        console.log("successfully added a user and their pet!");
        response.json({ status: "success", pet: pet });
      }
    });
  },
  showPet: function(request, response) {
    var id = request.params.id; //or request.params['id'];
    console.log("The pet id requested is:", id);
    Pet.findOne({ _id: id }, function(err, pet) {
      if (err) {
        console.log("something went wrong", err);
        response.json(err);
      } else {
        console.log(pet);
        response.json({ status: "success", pet: pet });
      }
    });
  },
  updatePet: function(request, response) {
    var id = request.params.id; //or request.params['id'];
    console.log("The pet id requested is:", id);
    Pet.update(
      { _id: id },
      {
        name: request.body.name,
        type: request.body.type,
        description: request.body.description,
        skill1: request.body.skill1,
        skill2: request.body.skill2,
        skill3: request.body.skill3
      },
      function(err, pet) {
        if (err) {
          console.log("something went wrong", err);
          return response.json(err);
        } else {
          console.log("Successfully edited a pet!");
          response.json({ status: "success", pet: pet });
        }
      }
    );
  },
  deletePet: function(request, response) {
    var id = request.params.id; //or request.params['id'];
    console.log("The pet id requested is:", id);
    Pet.remove({ _id: id }, function(err) {
      if (err) {
        console.log("something went wrong", err);
        response.json(err);
      } else {
        console.log("Pet has successfully been deleted!");
        response.json("Pet Deleted");
      }
    });
  },

  likePet(request, response) {
    var id = request.params.id; //or request.params['id'];
    console.log("The pet id requested is:", id);
    Pet.update(
      { _id: id },
      {
        $inc: {
          likes: 1
        }
      },
      function(err, doc) {
        if (doc.nModified == 1) {
          response.json({ updated: doc });
        } else {
          response.json({ error: err });
        }
      }
    );
  }
};
