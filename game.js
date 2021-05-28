// single scene spin-win game using Phaser

//prizes
let prizes_config = {
    count:8,
    prize_names : ["50% OFF","Amazon Vouchers","2 Extra Spins !!","3000 CB Credits","Hard Luck :(","CB Swags!","100% OFF","NETFLIX Subscription"]
}



let config = {
    type : Phaser.CANVAS,
    width : 800,
    height : 600,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
        
    }
    
};

let game = new Phaser.Game(config);

function preload() {
    console.log("Inside Preload");
    this.load.image('background','Assets/back.jpg');
    console.log(this);
    this.load.image('wheel','Assets/wheel.png');
    this.load.image('pin','Assets/pin.png');
    this.load.image('stand','Assets/stand.png');
    
   
}

function create() {
    console.log("Inside create");
    //create background image
    let W = game.config.width;
    let H = game.config.height;
    let background =  this.add.sprite(W/2,H/2,'background');
    background.setScale(0.20);
    
    //create stand
    let stand = this.add.sprite(W/2,H-80,'stand');
    stand.setScale(0.20);
    
    //create wheel
    this.wheel = this.add.sprite(W/2,H/2,'wheel');
    this.wheel.setScale(0.35);
    
    //create pin
    this.pin = this.add.sprite(W/2,75,'pin');
    this.pin.setScale(0.25);
    
    //event listener for mouse click
    
    this.input.on('pointerdown',spinwheel,this);
    
    //lets create text object
    font_style = {
        font : "bold 30px Times New Roman",
        align : "center",
        color : "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin and Win",font_style);
}

// Game loop
function update() {
    console.log("Inside Update");
    //this.wheel.angle += 2;
    
}

function spinwheel(){
    //this.pin.angle += -20;
    console.log("You clicked the mouse");
    console.log("start spinning");
    this.game_text.setText("Rolling...!");
    
    let rounds = Phaser.Math.Between(5,7);
    let degree = 17*Phaser.Math.Between(1,21);
    
    let total_angle = rounds*360+degree;
    
    let idx = prizes_config.count - 1 - Math.floor(degree/(360/prizes_config.count));
    
    tween = this.tweens.add({
        targets : this.wheel,
        angle : total_angle,
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope:this,
        onComplete: function(){
            
            this.game_text.setText("You won "+ prizes_config.prize_names[idx]);
        },
    })
}