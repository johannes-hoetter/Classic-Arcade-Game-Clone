// Enemies our player must avoid
class Enemy {

    constructor(x, y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
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

    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }

    update() {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPress) {
        //hoch: y Position um 75 reduzieren
        //links: x Position um 101 reduzieren
        //runter: y Position um 75 erhöhen
        //rechts: x Position um 101 erhöhen
        switch (keyPress) {
            case 'up':
                this.y -= 85;
                break;
            case 'left':
                this.x -= 101;
                break;
            case 'down':
                this.y += 85;
                break;
            case 'right':
                this.x += 101;
        }
        console.log(this.x, this.y);
    }
}


const row = new Map();
row.set('1st', 390);
row.set('2nd', 305);
row.set('3rd', 220);
row.set('4th', 135);
row.set('5th', 50);
let y1 = row.get('1st');
let y2 = row.get('2nd');
let y3 = row.get('3rd');
let y4 = row.get('4th');
let y5 = row.get('5th');

const player = new Player(202, 390); //start in the middle bottom (canvas has size of 505 x 606)

//testweise
let allEnemies = [new Enemy(0, y1), new Enemy(0, y2), new Enemy(0, y3), new Enemy(0, y4), new Enemy(0, y5)];


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