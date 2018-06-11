let clicker = {
  score: 0,
  value: 1,
  multiply: 1,
  times: 0,
  init(){
    this.counter();
    this.showScore();
    this.unlockMenu();
  },

  counter(){
    this.score = this.score+(this.multiply*this.value);
    this.times++;

    //click boost
    if(this.times == 100){
      this.multiply = this.multiply * 2;
    }
    if(this.times == 200){
      this.multiply = this.multiply * 2;
    }
    if(this.times == 500){
      this.multiply = this.multiply * 2;
    }
    if(this.times == 1000){
      this.multiply = this.multiply * 2;
    }
    return this;
  },

  showScore(){
    score.innerHTML = Math.round(this.score * 1000) / 1000;
  },

  unlockMenu(){
    if(this.score > 0){
      menu.style.display = "block";
    }
  },

}

class Auto{
  constructor(value, time, price, priceHTML, valueHTML, cpsHTML, timeHTML){
    this.value = value;
    this.time = time,
    this.price = price;
    this.cps = 0;
    this.multiply = 1;
    this.number = 0;
    this.priceHTML = priceHTML;
    this.valueHTML = valueHTML;
    this.cpsHTML = cpsHTML;
    this.timeHTML = timeHTML;
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
      //console.log('number ', this.number, ' price ', this.price, ' clicks per sec ', clicker.clicksPerSec);
      document.getElementById(this.priceHTML).innerHTML = this.price;
      document.getElementById(this.cpsHTML).innerHTML = this.cps;
      document.getElementById(this.valueHTML).innerHTML = this.value*this.multiply;
      document.getElementById(this.timeHTML).innerHTML = 'collect every ' +this.time / 1000 + 's';
      clicker.showScore();
      return this;
    }
  }

  boost(multi){
    this.multiply = this.multiply*multi;
    this.cps = (this.number*this.value*this.multiply*1000)/this.time;
    document.getElementById(this.valueHTML).innerHTML = this.value*this.multiply;
    document.getElementById(this.cpsHTML).innerHTML = this.cps;
    return this;
    }

  boostTime(minustime){
    this.time = this.time - minustime;
    this.cps = (this.number*this.value*this.multiply*1000)/this.time;
    document.getElementById(this.valueHTML).innerHTML = this.value*this.multiply;
    document.getElementById(this.cpsHTML).innerHTML = this.cps;
    return this;
  }
}

let Hand = new Auto(1, 1000, 10, 'handsPrice', 'handsValue', 'handsCPS', 'handsTime');
let Worker = new Auto(10, 2000, 50, 'workersPrice', 'workersValue', 'workersCPS', 'workersTime');
let Drill = new Auto(30, 5000, 200, 'drillsPrice', 'drillsValue', 'drillsCPS', 'drillsTime')
let Merch = new Auto(100, 15000, 500, 'merchPrice', 'merchValue', 'merchCPS', 'merchTime')
let Startup = new Auto(300, 30000, 1200, 'startupPrice', 'startupValue', 'startupCPS', 'startupTime')
let OilCompany = new Auto(10000, 200000, 7000, 'oilPrice', 'oilValue', 'oilCPS', 'oilTime')
let Illuminati = new Auto(100000, 1000000, 66666, 'illuminatiPrice', 'illuminatiValue', 'illuminatiCPS', 'illuminatiTime')

let clickWindow = document.getElementById('click');
let score = document.getElementById('score');
let menu = document.getElementById('menu-unlock');
let infobar = document.getElementById('infobar');

let info = function(message){
  infobar.style.opacity = 1;
  infobar.innerHTML = message;
  console.log(message);
}

document.getElementById('hands').addEventListener('click', () =>{
  //toggle auto click
  if(Hand.number == 0 && clicker.score >= Hand.price){
    setInterval(function(){
      Hand.doClicks();
    }, Hand.time);
  }
  Hand.buy();

  //boosts
  if(Hand.number == 10){
    Hand.boost(2);
    info("Hand Value Doubled");
  }

  if(Hand.number == 25){
    Hand.boost(2);
    info("Hand Value Doubled");
  }

  if(Hand.number == 50){
    Hand.boost(2);
    info("Hand Value Doubled");
  }

  if(Hand.number == 100){
    Hand.boost(2);
    info("Hand Value Doubled");
  }

})
document.getElementById('workers').addEventListener('click', () =>{
  if(Worker.number == 0 && clicker.score >= Worker.price){
    setInterval(function(){
      Worker.doClicks();
    }, Worker.time);
  }
  Worker.buy();


  if(Worker.number == 10){
    Worker.boost(2);
    info("Worker Value Doubled");
  }

  if(Worker.number == 25){
    Worker.boost(2);
    info("Worker Value Doubled");
  }

  if(Worker.number == 50){
    Worker.boost(2);
    info("Worker Value Doubled");
  }

  if(Worker.number == 100){
    Worker.boost(2);
    info("Worker Value Doubled");
  }
})
document.getElementById('drills').addEventListener('click', () =>{
  if(Drill.number == 0 && clicker.score >= Drill.price){
    setInterval(function(){
      Drill.doClicks();
    }, Drill.time);
  }
  Drill.buy();



  if(Drill.number == 25){
    Drill.boost(3);
    info("Drill Value x3");
  }

  if(Drill.number == 100){
    Drill.boost(4);
    info("Drill Value x4");
  }

})
document.getElementById('merch').addEventListener('click', () =>{
  if(Merch.number == 0 && clicker.score >= Merch.price){
    setInterval(function(){
      Merch.doClicks();
    }, Merch.time);
  }
  Merch.buy();


  if(Merch.number == 5){
    Merch.boost(1.2);
    info("Merch Value x1.2");
  }

  if(Merch.number == 15){
    Merch.boost(1.3);
    info("Merch Value x1.3");
  }

  if(Merch.number == 33){
    Merch.boost(1.4);
    info("Merch Value x1.4");
  }

  if(Merch.number == 51){
    Merch.boost(1.5);
    info("Merch Value x1.5");
  }

  if(Merch.number == 66){
    Merch.boost(6.66);
    info("Merch Value x6,66");
  }
  if(Merch.number == 70){
    Merch.boost(0.8);
    Merch.boostTime(1000);
    info("Merch Value x0,8, but time reduced by 1s");
  }

  if(Merch.number == 100){
    Merch.boost(2);
    info("Merch Value x2");
  }

})
document.getElementById('startup').addEventListener('click', () =>{
  if(Startup.number == 0 && clicker.score >= Startup.price){
    setInterval(function(){
      Startup.doClicks();
    }, Startup.time);
  }
  Startup.buy();

  if(Startup.number == 50){
    Startup.boost(10);
    info("Startup Value x10");
  }

  if(Startup.number == 100){
    Startup.boost(2);
    info("Startup Value x2");
  }
})
document.getElementById('oil').addEventListener('click', () =>{
  if(OilCompany.number == 0 && clicker.score >= OilCompany.price){
    setInterval(function(){
      OilCompany.doClicks();
    }, OilCompany.time);
  }
  OilCompany.buy();

  if(OilCompany.number == 10){
    OilCompany.boost(5);
    info("Oil Value x5");
  }

  if(OilCompany.number == 100){
    OilCompany.boost(5);
    info("Oil Value x5");
  }
})
document.getElementById('illuminati').addEventListener('click', () =>{
  if(Illuminati.number == 0 && clicker.score >= Illuminati.price){
    setInterval(function(){
      Illuminati.doClicks();
    }, Illuminati.time);
  }
  Illuminati.buy();

  if(Illuminati.number == 66){
    info("Illuminati Value x100 and time reduced by 5s");
    Illuminati.boost(100);
    Iluminati.boostTime(5000);
  }

  if(Illuminati.number == 69){
    Illuminati.boost(2);
    info("Illuminati Value x2");
  }
})



clickWindow.addEventListener('click', () =>{
  clicker.init();
});
