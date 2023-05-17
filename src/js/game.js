import {Actor, Engine, Vector, Label, Color, Font, Debug, Transform, Screen, Scene, Camera} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";
import {Track} from "./track.js";
import {Car} from "./car.js";


export class Game extends Engine {
    constructor() {
        super();
        this.start(ResourceLoader).then(() => this.startGame());
        this.showDebug(true);
        this.debug.motion = {
            accelerationColor: Color.Azure,
            showAcceleration: true,
            showAll: true,
            showVelocity: true,
            velocityColor: Color.Green,
        };
    }

    startGame() {
        let track = new Track();
        this.add(track);

        let car = new Car();
        this.add(car);
    }
}

new Game();
