import {Actor, Engine, Vector, Label, Color, Font, Debug, Transform, Screen, Scene, Camera, Physics} from "excalibur";
import {Track} from "./track.js";
import {Car} from "./car.js";
import {Pion} from "./pion.js";
import {Tire} from "./tire.js";
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

        for (let i = 0; i < 10; i++) {
            let pion = new Pion();
            this.add(pion);

            let tire = new Tire();
            this.add(tire);

        }

        let wall = new Wall(-550, -540, 350, -682);
        this.add(wall);
        let wall2 = new Wall(-440, -550, -400, -75);
        this.add(wall2);
        let wall3 = new Wall(775, -675, 520, -375);
        this.add(wall3);



        this.car = new Car()
        this.car.z = 1000;
        this.add(this.car);


        this.camera.strategy.elasticToActor(this.car, 0.5, 0.75);
        this.zoom = this.car.defaultCameraZoom;

    }

    onPreUpdate(engine, delta) {

        if (this.car.carSpeed > 0) {

            if (this.zoom > this.car.defaultCameraZoom - (this.car.carSpeed / this.car.cameraZoom)) {
                this.zoom -= 0.0025
            }
            if (this.zoom < this.car.defaultCameraZoom - (this.car.carSpeed / this.car.cameraZoom)) {
                this.zoom += 0.0025
            }

        } else {

            if (this.zoom > this.car.defaultCameraZoom - (-1 * (this.car.carSpeed / this.car.cameraZoom))) {
                this.zoom -= 0.0025
            }
            if (this.zoom < this.car.defaultCameraZoom - (-1 * (this.car.carSpeed / this.car.cameraZoom))) {
                this.zoom += 0.0025
            }
        }

        if (this.zoom > this.car.defaultCameraZoom - 0.0025 && this.zoom < this.car.defaultCameraZoom + 0.0025) {
            this.zoom = this.car.defaultCameraZoom;
        }

        if (this.zoom < this.car.maxCameraZoom) {
            this.zoom = this.car.maxCameraZoom
        }



        this.camera.zoom = Math.round(this.zoom * 1000) / 1000;
    }

}
