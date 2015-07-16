var shops=[];

var DonutShop = function(location, min, max, avg){
  this.location = location;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.hoursOpen = 11;
  this.hourlyDonuts = [];
  this.totalDonuts = 0;
};

shops.push(new DonutShop("Downtown", 8, 43, 4.5));
shops.push(new DonutShop("Capital Hill", 4, 37, 2));
shops.push(new DonutShop("South Lake Union", 9, 23, 6.33));
shops.push(new DonutShop("Wedgewood", 2, 28, 1.25));
shops.push(new DonutShop("Ballard", 8, 28, 3.75));

DonutShop.prototype.generateRandom = function() {
  return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
};

DonutShop.prototype.donutsPerHour = function(){
  return Math.floor(this.generateRandom() * this.avg);
};

DonutShop.prototype.donutsPerDay = function(){
  for (var i = 0; i < this.hoursOpen; i++){
    this.hourlyDonuts.push(this.donutsPerHour());
  }
  return this.hourlyDonuts;
};

DonutShop.prototype.render = function(){
  var row = document.createElement('tr');
  var name = document.createElement('td');
  name.textContent = this.location;
  row.appendChild(name);

  var myArray = this.donutsPerDay();
  for (var i = 0; i < this.hourlyDonuts.length; i++){
    var data = document.createElement('td');
    data.textContent =  myArray[i];
    row.appendChild(data);
    this.totalDonuts += myArray[i];
    }
  var total = document.createElement('td');
  total.textContent = this.totalDonuts;
  row.appendChild(total);
  return row;
};

var content = document.getElementById('content');

for(var i=0; i < shops.length; i++){
content.appendChild(shops[i].render());
}

var buttonPressed = function(){
  var newLocationName = document.getElementById('locNameId').value;
  var newMinCust = document.getElementById('minCustId').value;
  var newMaxCust = document.getElementById('maxCustId').value;
  var newAverage = document.getElementById('avgDonutsId').value
  var found = false;
    for(var i = 0; i < shops.length; i++){
      if(newLocationName.toUpperCase() === shops[i].location.toUpperCase()){
        var found = true;
        var index = i;
        break;
        }
    }
      if (found === false){
        shops.push(new DonutShop(newLocationName, newMinCust, newMaxCust, newAverage));
        shops[shops.length - 1].donutsPerDay();
        shops[shops.length - 1].render();
      }
    if (found === true){
      var foundRow = document.getElementById(shops[index].location);
      var childrenToReplace = foundRow.childNodes;
      shops[index] = new Shop(newLocationName, newMin, newMax, newAvg);
      shops[index].donutsPerDay();
      for (var i = 1; i < childrenToReplace.length; i++){
        childrenToReplace[i].textContent = shops[index].donutsPerDay[i-1];
      }
    childrenToReplace[childrenToReplace.length - 1].textContent = shops[index].this.totalDonuts;
    }
}
var el = document.getElementById("pushed");
el.addEventListener("click", buttonPressed, false);

