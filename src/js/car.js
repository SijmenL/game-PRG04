import {Actor, Input, Vector, Transform, Debug, Color, Shape, Collider, CollisionType, Physics} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";


export class Car extends Actor {

    carRotation = 0;
    carSpeed = 0;
    carAcceleration = 1;
    maxSpeed = 500;
    maxAcceleration = 100;
    cameraZoom = 2500;
    maxCameraZoom = 0.5;
    defaultCameraZoom = 1.2;
    isRotating;
    isDriving;

    constructor() {
        super()
        this.graphics.use(Resources.Car.toSprite());

        this.pos = new Vector(400, 300)
        this.scale = new Vector(0.2, 0.2);
        this.collider.set(Shape.Box(420, 200));
        this.body.collisionType = CollisionType.Active;
        this.body.friction = 0.99;
        this.body.mass = 1000;
    }

    onPreUpdate(engine, delta) {

        this.isRotating = false;
        this.isDriving = false;


        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Up)) {
            if (this.carAcceleration > -this.maxAcceleration) {
                this.carAcceleration -= 5
            }

            if (this.carSpeed > -this.maxSpeed && this.carSpeed <= 0) {
                this.carSpeed -= -0.1 * this.carAcceleration;
            }
            if (this.carSpeed > 0) {
                this.carSpeed -= 10;
            }
        }
        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.Down)) {
            if (this.carAcceleration < this.maxAcceleration) {
                this.carAcceleration += 5
            }

            if (this.carSpeed < (this.maxSpeed / 2) && this.carSpeed >= 0) {
                this.carSpeed += 0.1 * this.carAcceleration;
            }
            if (this.carSpeed < 0) {
                this.carSpeed += 5;
            }
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            if (this.carRotation > -0.03) {
                if (this.carSpeed < 0) {
                    this.carRotation += (0.00001 * this.carSpeed)
                } else {
                    this.carRotation += (-0.00001 * this.carSpeed)

                }
            }
            this.isRotating = true
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
                if (this.carRotation < 0.03) {
                    if (this.carSpeed < 0) {
                        this.carRotation -= (0.00001 * this.carSpeed)
                    } else {
                        this.carRotation -= (-0.00001 * this.carSpeed)

                    }
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

        // direction is the cosine/sine of the angle!
        let direction = new Vector(
            Math.cos(this.rotation) * this.carSpeed,
            Math.sin(this.rotation) * this.carSpeed
        );
        this.body.rotation = this.rotation + this.carRotation

        this.vel = direction;

        if (this.body.angularVelocity > 0) {
            this.body.angularVelocity -= 0.1
        }
        if (this.body.angularVelocity < 0) {
            this.body.angularVelocity += 0.1
        }
        if (this.body.angularVelocity < 0.1 && this.body.angularVelocity > -0.1) {
            this.body.angularVelocity = 0
        }

    }
}