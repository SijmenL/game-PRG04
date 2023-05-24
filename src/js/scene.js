import {Actor, Engine, Vector, Label, Color, Font, Debug, Transform, Screen, Scene, Camera, Physics} from "excalibur";
import {Track} from "./track.js";
import {Car} from "./car.js";
import {Pion} from "./pion.js";
import {Wall} from "./wall.js";


export class Level extends Scene {
    car;

    constructor() {
        super();
        this.camera = new Camera();
        Physics.useRealisticPhysics();
    }


    onInitialize() {
        let track = new Track();
        this.add(track);

        let wall = new Wall();
        this.add(wall);

        for (let i = 0; i < 25; i++){
            let pion = new Pion();
            this.add(pion);
        }

        this.car = new Car()
        this.car.z = 1000;
        this.add(this.car);


        this.camera.strategy.radiusAroundActor(this.car, 0);
    }

    onPreUpdate(engine, delta) {

            if (this.car.carSpeed > 0) {
                if (this.car.defaultCameraZoom - (this.car.carSpeed / this.car.cameraZoom) > this.car.maxCameraZoom) {
                    this.camera.zoom = this.car.defaultCameraZoom - (this.car.carSpeed / this.car.cameraZoom);
                }
            } else {
                if (this.car.defaultCameraZoom - (-1 * (this.car.carSpeed / this.car.cameraZoom)) > this.car.maxCameraZoom) {
                    this.camera.zoom = this.car.defaultCameraZoom - (-1 * (this.car.carSpeed / this.car.cameraZoom));
                }
            }
        }

    }
