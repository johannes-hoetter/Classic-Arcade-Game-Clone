(function(global) {
    //global "settings"

    "use strict";
    const win = global.window;
    const rows = new Map();
    rows.set('row1', 390); //top row (one row before finish line)
    rows.set('row2', 305);
    rows.set('row3', 220);
    rows.set('row4', 135);
    rows.set('row5', 50);  //bottom row (start row)

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

    let gamesWon = 0;

//----------------------------------------------------------------------------------------------------------------------
//Classes of the Enemy and the Player

    // Enemies our player must avoid
    class Enemy {

        //create a new Enemy object
        constructor(row, speed) {
            //Enemies get constructed by naming the row at which the enemy sits at (3, 4 or 5) and the speed
            //at which it moves
            this.row = row;
            this.speed = speed; //can be set to 0 to freeze the enemy

            //image of the enemy (currently only bugs available ;) )
            this.sprite = 'images/enemy-bug.png';

            //coordinates, will be changed during the play
            this.x = 0;
            this.y = rows.get(this.row);
        }

        // Update the enemy's position, required method for game
        // Parameter: dt, a time delta between ticks
        update(dt) {
            const mvmt = this.speed * dt;
            this.x += mvmt;
            if (this.x > 505) {
                //when the enemy moves out of the screen, reset its location
                //slightly left to the scren (so it moves into the screen again)
                this.x = -100;
            }

            if (this.x >= player.x -35 && this.x <= player.x + 35 &&
                this.y === player.y) {
                //check for collision;
                //values (e.g. 35) have been tested and have found to be the values
                //at which the "smoothness" of the collision looks best
                player.loseGame();
            }
        }

        // Draw the enemy on the screen, required method for game
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }

        //make the enemy stop moving
        freeze() {
            this.speed = 0;
        }

        //get the row of the enemy
        getRow() {
            return this.row;
        }

    }

//----------------------------------------------------------------------------------------------------------------------

    class Player {

        //create a new Player object
        constructor(x = 202, y = 390) {
            //the player gets positioned directly through the x and y coordinates;
            //currently, they're set by default only

            //memorize where the player started at (to place the player back there after one game)
            this.beginX = x;
            this.beginY = y;

            //image of the player
            this.sprite = 'images/char-boy.png';

            //current location
            this.x = this.beginX;
            this.y = this.beginY;

            //only needed to freeze the player
            this.speed = 1; //if freezed, this is set to 0
        }

        //update the state of the game
        update() {
            if (this.y === -35) {
                this.winGame();
            }
        }

        //draw the player
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }

        //handle key presses in order to move the player
        handleInput(keyPress) {
            let mvmt; //where the player goes
            switch (keyPress) {
                case 'up':
                    if (this.y > -35 ) {
                        mvmt = this.speed * 85;
                        this.y -= mvmt;
                    }
                    break;
                case 'left':
                    if (this.x > 0) {
                        mvmt = this.speed * 101;
                        this.x -= mvmt;
                    }
                    break;
                case 'down':
                    if (this.y < 390) {
                        mvmt = this.speed * 85;
                        this.y += mvmt;
                    }
                    break;
                case 'right':
                    if (this.x < 404) {
                        mvmt = this.speed * 101;
                        this.x += mvmt;
                    }
            }
            //console.log(this.x, this.y);
        }

        //initialize the players state
        init() {
            this.x = this.beginX;
            this.y = this.beginY;
            this.speed = 1;
        }

        //freeze the player
        freeze() {
            this.speed = 0;
        }

        //player reaches top row
        winGame() {
            //short freeze, so that player knows that game is over
            win.player.freeze();
            for (const enemy of win.allEnemies) {
                enemy.freeze();
            }

            //restart
            win.setTimeout( () => {
                win.player.init();
                win.player.getEnemies();
            }, 1000);
        }

        //player collides with enemy
        loseGame() {
            //right now, this does exactly (!) the same as winGame()
            //will be changed in the future
            win.player.freeze();
            for (const enemy of win.allEnemies) {
                enemy.freeze();
            }

            //restart
            win.setTimeout( () => {
                win.player.init();
                win.player.getEnemies();
            }, 1000);
        }

        //used to get the enemies for one play
        getEnemies() {
            win.allEnemies = [];
            let enemyRowPossibilities = [
               // 'row1',
               // 'row2',
                'row3', 'row3',
                'row4', 'row4',
                'row5', 'row5', 'row5'];

            let enemySpeedPossibilites = [10, 30, 50, 100, 130, 150, 200, 250, 300, 350, 500];
            enemyRowPossibilities = shuffle(enemyRowPossibilities);
            enemySpeedPossibilites = shuffle(enemySpeedPossibilites);
            let rowsUsed = new Set([]);
            while(rowsUsed.size < 3) { //while not all rows are filled with enemies
                const rowUsed = enemyRowPossibilities.pop();
                const speedUsed =  enemySpeedPossibilites.pop();
                const enemy = new Enemy(rowUsed, speedUsed);
                win.allEnemies.push(enemy);

                //update for while check
                for (const enemy of win.allEnemies) {
                    rowsUsed.add(enemy.getRow());
                }
            }
        }
    }

//----------------------------------------------------------------------------------------------------------------------
//Create the objects


    //make player and allEnemies available for engine.js
    win.player = new Player(); //start in the middle bottom (canvas has size of 505 x 606)
    player.getEnemies();

//----------------------------------------------------------------------------------------------------------------------
//Helper function

    //Taken from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

})(this);




