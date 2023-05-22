import {Actor, Input, Vector, Transform, Debug, Color} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";


export class Car extends Actor {

    carRotation = 0;
    carSpeed = 0;
    carAcceleration = 1;
    isRotating;
    isDriving;

    constructor() {
        super()
        this.graphics.use(Resources.Car.toSprite());

        this.pos = new Vector(400, 300)
        this.scale = new Vector(0.2, 0.2);
    }

    onPreUpdate(engine) {

        this.isRotating = false;
        this.isDriving = false;


        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Up)) {
            if (this.carAcceleration > -100) {
                this.carAcceleration -= 5
            }

            if (this.carSpeed > -500 && this.carSpeed <= 0) {
                this.carSpeed -= -0.1 * this.carAcceleration;
            }
            if (this.carSpeed > 0) {
                this.carSpeed -= 10;
            }
        }
        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.Down)) {
            if (this.carAcceleration < 100) {
                this.carAcceleration += 5
            }

            if (this.carSpeed < 250 && this.carSpeed >= 0) {
                this.carSpeed += 0.1 * this.carAcceleration;
            }
            if (this.carSpeed < 0) {
                this.carSpeed += 5;
            }
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            if (this.carRotation > -0.03) {
                this.carRotation -= (-0.00001 * this.carSpeed)
            }

            this.isRotating = true
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
            if (this.carRotation < 0.03) {
                this.carRotation += (-0.00001 * this.carSpeed)
            }
            this.isRotating = true
        }

        if (this.carSpeed > 0 || this.carSpeed < 0) {
            this.isDriving = true;
        }


        if (this.isRotating === false || this.isDriving === false) {
            if (this.carRotation > -0.01 && this.carRotation < 0.01) {
                this.carRotation = 0
            }
            if (this.carRotation > 0) {
                this.carRotation -= 0.0025
            }
            if (this.carRotation < 0) {
                this.carRotation += 0.0025
            }
        }

        // calculate momentum & braking
        if (this.carSpeed > 5) {
            this.carSpeed -= 5
        } else {
            if (this.carSpeed <= 5 && this.carSpeed >= 0) {
                this.carSpeed = 0;
            }
        }

        if (this.carSpeed < -5) {
            this.carSpeed += 5
        } else {
            if (this.carSpeed >= -5 && this.carSpeed <= 0) {
                this.carSpeed = 0;
            }
        }

        // this.anchor = new Vector(0.5, 0.5);
        // direction is the cosine/sine of the angle!
        let direction = new Vector(
            Math.cos(this.rotation) * this.carSpeed,
            Math.sin(this.rotation) * this.carSpeed
        );
        this.rotation = this.rotation + this.carRotation
        console.log(this.carRotation)

        this.vel = direction;
    }        // }
}