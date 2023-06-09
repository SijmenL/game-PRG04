import {
    Actor,
    Engine,
    Vector,
    Label,
    Color,
    Font,
    Debug,
    Transform,
    Screen,
    Scene,
    Camera,
    DisplayMode
} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";
import {TrackBeach} from "./track_beach.js";
import {Menu} from "./menu.js";
import {Garage} from "./garage.js";
import {EndScreen} from "./endScreen.js";


export class Game extends Engine {

    coins;
    engineUpgrade;
    turboUpgrade;
    tireUpgrade;
    horsePowerUpgrade;

    raceFinished = false;
    raceMiddle = false;

    constructor() {
        super({width: 1440, height: 900, displayMode: DisplayMode.FillScreen});
        this.start(ResourceLoader).then(() => this.startGame());
        this.showDebug(false);
        this.add('trackBeach', new TrackBeach());
        this.add('garage', new Garage());
        this.add('menu', new Menu());
        this.add('endScreen', new EndScreen());


        this.debug.motion = {
            accelerationColor: Color.Azure,
            showAcceleration: true,
            showAll: true,
            showVelocity: true,
            velocityColor: Color.Green,
        };
    }

    startGame(engine) {
        this.game = engine;
        this.coins = 0;
        this.engineUpgrade = 0;
        this.turboUpgrade = 0;
        this.tireUpgrade = 0;
        this.horsePowerUpgrade = 0;


        this.goToScene('menu');


    }

    updateCoins(amount) {
        if (amount => 0){
            this.coins = this.coins + amount;
            return this.coins.toString();
        } else {
            this.coins = this.coins - amount;
            return this.coins.toString();

        }
    }

    updateEngineUpgrade(amount) {
        this.engineUpgrade = this.engineUpgrade + amount;
        return this.engineUpgrade.toString();
    }

    updateTurboUpgrade(amount) {
        this.turboUpgrade = this.turboUpgrade + amount;
        return this.turboUpgrade.toString();
    }

    updateTireUpgrade(amount) {
        this.tireUpgrade = this.tireUpgrade + amount;
        return this.tireUpgrade.toString();
    }

    updateHorsePowerUpgrade(amount) {
        this.horsePowerUpgrade = this.horsePowerUpgrade + amount;
        return this.horsePowerUpgrade.toString();
    }

}

new Game();
