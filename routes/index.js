var express = require('express');
var router = express.Router();



let serverArray = [];

var fs = require("fs");

let fileManager  = {
  x: 33,
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    serverArray = goodData;
  },

  write: function() {
    let data = JSON.stringify(serverArray);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};








let RecipeObject = function (pTitle, pCooktime, pType, pCalories, pCreator, pDate) {
    this.Title = pTitle;
    this.Cooktime = pCooktime;
    this.Type = pType;
    this.Calories = pCalories;
    this.Creator = pCreator;
    this.Date = pDate;
    this.ID = Math.random().toString(16).slice(5);

}
if(!fileManager.validData()) {
  serverArray.push(new RecipeObject("testTitle", 5, "Breakfast", 150, "Me", 2022));
  fileManager.write();
}
else {
  fileManager.read(); // do have prior movies so load up the array
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* GET all Recipe Data */
router.get('/getAllRecipes', function(req, res){
  fileManager.read();
  res.status(200).json(serverArray);
});


// POST recipe data
router.post('/AddRecipe', function(req,res){
  const newRecipe = req.body;
  serverArray.push(newRecipe);
  fileManager.write(); 
  res.status(200).json(newRecipe);

});

module.exports = router;

