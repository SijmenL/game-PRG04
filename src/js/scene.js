import {Actor, Engine, Vector, Label, Color, Font, Debug, Transform, Screen, Scene, Camera} from "excalibur";
import {Track} from "./track.js";
import {Car} from "./car.js";

export class Level extends Scene {
    car;

    constructor() {
        super();
        this.camera = new Camera();
    }


    onInitialize() {
        let track = new Track();
        this.add(track);

        this.car = new Car();
        this.add(this.car);

        this.camera.strategy.radiusAroundActor(this.car, 100)
    }

}