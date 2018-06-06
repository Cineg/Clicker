let clicker = {
  score: 0,
  init(){
    this.counter();
    this.showScore();
    this.unlockMenu();
  },

  counter(){
    this.score++;
    console.log(this.score);
    return this;
  },

  showScore(){
    score.innerHTML = Math.round(this.score * 1000) / 1000;
  },

  unlockMenu(){
    if(this.score > 0){
      menu.style.display = "block";
    }

    if(this.score > 50){

    }
  },

}

class Auto{
  constructor(value, time, price, priceHTML, valueHTML, cpsHTML){
    this.value = value;
    this.time = time,
    this.price = price;
    this.cps = 0;
    this.multiply = 1;
    this.number = 0;
    this.priceHTML = priceHTML;
    this.valueHTML = valueHTML;
    this.cpsHTML = cpsHTML;
    this.toggled = 0;
  }

  doClicks(){
    this.toggled = 1;
    clicker.score = clicker.score + (this.value*this.number*this.multiply);
    clicker.showScore();
    return this;
  }
  // TO FIX
  /*
  wait(){
    setInterval(function doClicks(){
    }, this.time, this.value, this.number, this.multiply)
  }
  */
  buy(number){
    if(clicker.score >= this.price){
      this.number++;
      this.cps = (this.number*this.value*this.multiply*1000)/this.time;
      clicker.score -= Math.round(this.price * 100) / 100;
      this.price = Math.round((this.price *= 1.1) * 100) / 100;
      console.log('number ', this.number, ' price ', this.price, ' clicks per sec ', clicker.clicksPerSec);
      document.getElementById(this.priceHTML).innerHTML = this.price;
      document.getElementById(this.cpsHTML).innerHTML = this.cps;
      document.getElementById(this.valueHTML).innerHTML = this.value*this.multiply;
      clicker.showScore();
      return this;
    }
    else if(this.number > 0 || clicker.score > this.price){
      console.log("chuj do szczania");
    }
  }

  boost(multi){
    this.multiply = this.multiply*multi;
    this.cps = (this.number*this.value*this.multiply*1000)/this.time;
    document.getElementById(this.valueHTML).innerHTML = this.value*this.multiply;
    document.getElementById(this.cpsHTML).innerHTML = this.cps;
    return this;
    }
}

let hands = {
  number: 0,
  value: 1,
  multiply: 1,
  time: 1000,
  price: 10,
  cps: 0,

  doClicks(){
    clicker.score = clicker.score + (this.value*this.number*this.multiply);
    clicker.showScore();
  },
  autoClick(){
    this.wait(this.time, this.doClicks());
  },
  wait(time){
    let timeout = setTimeout(function wait() {
      console.log(time);
      hands.doClicks();
      timeout = setTimeout(wait, time);
    }, time);
  },
  buy(){
    if(clicker.score >= this.price){
      this.number++;
      this.cps = (this.number*this.value*this.multiply*1000)/this.time;
      clicker.score -= Math.round(this.price * 100) / 100;
      this.price = Math.round((this.price *= 1.1) * 100) / 100;
      console.log('number ', this.number, ' price ', this.price, ' clicks per sec ', clicker.clicksPerSec);
      document.getElementById('handsPrice').innerHTML = this.price;
      document.getElementById('handsCPS').innerHTML = this.cps;
      clicker.showScore();
      return this;
    }
  }
}

let Hand = new Auto(1, 1000, 10, 'handsPrice', 'handsValue', 'handsCPS');
let Worker = new Auto(30, 5000, 50, 'workersPrice', 'workersCPS');

let clickWindow = document.getElementById('click');
let score = document.getElementById('score');
let menu = document.getElementById('menu-unlock');


document.getElementById('hands').addEventListener('click', () =>{
  //toggle auto click
  if(Hand.number == 0 && clicker.score >= Hand.price){
    setInterval(function(){
      Hand.doClicks();
    }, Hand.time);
  }
  Hand.buy();
  if(Hand.number == 10){
    Hand.boost(2);
  }
})
document.getElementById('workers').addEventListener('click', () =>{
  if(Worker.number == 0 && clicker.score >= Worker.price){
    setInterval(function(){
      Worker.doClicks();
    }, Worker.time);
  }
  Worker.buy();
})
clickWindow.addEventListener('click', () =>{
  clicker.init();
});


//this fucking work as intended, so im not deleting it yet
//hands.autoClick();

//Well, it works, but not in the way im happy with.
/*
function wait(){
   setInterval(function(){
      Jew.doClicks();
   }, Jew.time);
}
wait();
*/
