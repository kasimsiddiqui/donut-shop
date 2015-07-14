var DonutShop = function(location, min, max, avg){
  this.location = location;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.hourlyDonuts = [];
};

var location1 = new DonutShop("Downtown", 8, 43, 4.5);
var location2 = new DonutShop("Capital Hill", 4, 37, 2);
var location3 = new DonutShop("South Lake Union", 9, 23, 6.33);
var location4 = new DonutShop("Wedgewood", 2, 28, 1.25);
var location5 = new DonutShop("Ballard", 8, 28, 3.75);

DonutShop.prototype.generateRandom = function() {
  return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
};

DonutShop.prototype.donutsPerHour = function(){
  return Math.floor(this.generateRandom() * this.avg);
};

DonutShop.prototype.donutsPerDay = function(){
  for (var i = 0; i < 12; i++){
    this.hourlyDonuts.push(this.donutsPerHour());
  }
  return this.hourlyDonuts;
};

DonutShop.prototype.render = function(){
  var row = document.createElement('tr');
  var name = document.createElement('td');
  name.textContent = this.location;
  row.appendChild(name);

  var totalDonuts = 0;
  var myArray = this.donutsPerDay();
  for (var i = 0; i < this.hourlyDonuts.length; i++){
    totalDonuts += myArray[i];
    var data = document.createElement('td');
    data.textContent =  myArray[i];
    row.appendChild(data);
    totalDonuts += myArray[i];
  }
  var total = document.createElement('td');
  total.textContent = totalDonuts;
  console.log(row);
  row.appendChild(total);
  return row;
};

document.getElementById('content').appendChild(location1.render());
document.getElementById('content').appendChild(location2.render());
document.getElementById('content').appendChild(location3.render());
document.getElementById('content').appendChild(location4.render());
