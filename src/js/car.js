import {Actor, Input, Vector, Transform, Debug, Color} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";


export class Car extends Actor {

    carRotation = 0;
    carSpeed = 0;
    carAcceleration = 1;

    constructor() {
        super()
        this.graphics.use(Resources.Car.toSprite());

        this.pos = new Vector(400, 300)
        this.scale = new Vector(0.2, 0.2);
    }

    onPreUpdate(engine) {

        console.log(this.carAcceleration)

        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Up)) {
            if (this.carAcceleration > -10) {
                this.carAcceleration -= 0.5
            }

            if (this.carSpeed > -500 && this.carSpeed <= 0) {
                this.carSpeed -= -1 * this.carAcceleration;
            }
            if (this.carSpeed > 0) {
                this.carSpeed -= 5;
            }
        }
        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.Down)) {
            if (this.carAcceleration < 10) {
                this.carAcceleration += 0.5
            }

            if (this.carSpeed < 250 && this.carSpeed >= 0) {
                this.carSpeed += this.carAcceleration;
            }
            if (this.carSpeed < 0) {
                this.carSpeed += 5;
            }

        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
                this.carRotation = this.carRotation - (-0.000075 * this.carSpeed)
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
                this.carRotation = this.carRotation + (-0.000075 * this.carSpeed)
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
        this.rotation = this.carRotation
        // direction is the cosine/sine of the angle!
        let direction = new Vector(
            Math.cos(this.rotation) * this.carSpeed,
            Math.sin(this.rotation) * this.carSpeed
        );

        this.vel = direction;
    }        // }
}