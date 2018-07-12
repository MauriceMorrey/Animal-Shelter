var Pets = require("../controllers/pets.js");
var path=require('path')


module.exports = function(app) {
    app.get("/api/pets/:sorted", function(request, response) {
        Pets.get_pets(request, response);
      });
    
      app.post("/api/pets", function(request, response) {
        Pets.post_pets(request, response);
      });
    
      app.get("/api/showPet/:id", function(request, response) {
        Pets.showPet(request, response);
      });
    
      app.put("/api/updatePet/:id", function(request, response) {
        Pets.updatePet(request, response);
      });
    
      app.delete("/api/deletePet/:id", function(request, response) {
        Pets.deletePet(request, response);
      });

      app.get('/api/likePet/:id', function(request,response){
        Pets.likePet(request,response);
    })

      app.all("*", function(request,response,next) {
        response.sendFile(path.resolve("./public/dist/public/index.html"))
      });

};
