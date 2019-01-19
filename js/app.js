// Enemies our player must avoid
class Enemy {

    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        const mvmt = this.speed * dt;
        this.x += mvmt;
        if (this.x > 505) {
            //when the enemy moves out of the screen, reset its location
            //slightly left to the scren (so it moves into the screen again)
            this.x = -100;
        }

        if (this.x >= player.x -35 && this.x <= player.x + 35 &&
            this.y == player.y) {
            player.init();
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

class Player {

    constructor(x = 202, y = 390) {
        this.sprite = 'images/char-boy.png';
        this.beginX = x
        this.beginY = y;
        this.x = x;
        this.y = y;
    }

    update() {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPress) {
        //hoch: y Position um 85 reduzieren
        //links: x Position um 101 reduzieren
        //runter: y Position um 85 erhöhen
        //rechts: x Position um 101 erhöhen
        switch (keyPress) {
            case 'up':
                if (this.y > -35 ) {
                    this.y -= 85;
                }
                break;
            case 'left':
                if (this.x > 0) {
                    this.x -= 101;
                }
                break;
            case 'down':
                if (this.y < 390) {
                    this.y += 85;
                }
                break;
            case 'right':
                if (this.x < 404) {
                    this.x += 101;
                }
        }
        //console.log(this.x, this.y);
    }

    init() {
        this.x = this.beginX;
        this.y = this.beginY;
    }
}


const row = new Map();
row.set('1', 390); //top row (one row before finish line)
row.set('2', 305);
row.set('3', 220);
row.set('4', 135);
row.set('5', 50);  //bottom row (start row)
let y1 = row.get('1');
let y2 = row.get('2');
let y3 = row.get('3');
let y4 = row.get('4');
let y5 = row.get('5');

const player = new Player(); //start in the middle bottom (canvas has size of 505 x 606)

//testweise
let allEnemies = [new Enemy(0, y1, 100), new Enemy(0, y2, 50), new Enemy(0, y3, 200)];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});