// Game title: Surviving
// Author: jaxon ruiz
// ~25 hours worked

// technically interesting (lol)
    /* i definitely went into this project with too many broad technical ideas for mechanics and stuff, 
    and ended up not really being able to focus on any single idea for most of the time i spent working, 
    which is now left in various deleted blocks of code. i ended up settling on more of a physics based runner
    and had to play around a lot with the physics engine to tweak the amounts of impact getting hit by an obstacal 
    would cause the player. 
    im also somewhat proud of how i ended up doing the obstacle spawning/managing with the seperate MapGenerator class,
    which would handle the creation and storage of the obstacles, though i feel like the code is a bit of a mess 
    */

// visual style
    /* i wanted to make a flash style game with this project, but wasn't really able to spend as much time working on 
    the visuals as i wouldve wanted to, however i'm somewhat proud of the multi layered parallax in the background to give
    the impression of high speeds. i think the depth created by several layers of parallax helps really sell the speedy effect


// misc notes
/* I originally wanted to make a game based on nostalgia for old flash games but ended up drifting away 
too much from my initial idea, so its kind of ended up as a mishmash of various thematics. However i think 
its close enough to the spirit of some of the flash games i played
(still using semicolons because of C trauma)
I did not sufficiently preplan the runner, and changed my mind FAR too much.
by the end my code is a mess of various attempted ideas, many of which are 
suboptimal or incomplete.
i feel like i have (er) "creative" coding solutions to some things. to say the least...
also im working on this on two different setups, and framerates are heavily affecting gameplay feel...
*/

let config = {
    type: Phaser.AUTO,
    width: 1920/2, // didnt want to do the math myself
    height: 1080/2,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Menu, Play, GameOver, Credits]
}
let game = new Phaser.Game(config);
let keyEnter, keyCredits, keyRestart, keyJump, keyUp, keyDown, keyLeft, keyRight;
// kept having too many ideas, several unnecessary keys here