import {Actor, Input, Vector, Transform, Debug, Color, Shape, Collider, CollisionType, Physics} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";


export class Car extends Actor {

    carRotation = 0;
    carSpeed = 0;
    carAcceleration = 1;
    maxSpeed = 750;
    maxAcceleration = 100;
    cameraZoom = 2000;
    maxCameraZoom = 0.5;
    defaultCameraZoom = 1.2;
    isRotating;
    isDriving;
    maxRotation = 0.00002;
    temporaryMaxSpeed = this.maxSpeed;

    constructor() {
        super()
        this.graphics.use(Resources.Car.toSprite());

        this.pos = new Vector(400, 300)
        this.scale = new Vector(0.2, 0.2);
        this.collider.set(Shape.Box(390, 180));
        this.body.collisionType = CollisionType.Active;
        this.body.friction = 0.99;
        this.body.mass = 100000;
    }


    onPreUpdate(engine, delta) {

        this.isRotating = false;
        this.isDriving = false;


        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Up)) {
            if (this.carAcceleration > -this.maxAcceleration) {
                this.carAcceleration -= 5
            }

            if (this.carSpeed > -this.temporaryMaxSpeed && this.carSpeed <= 0) {
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

            if (this.carSpeed < (this.temporaryMaxSpeed / 2) && this.carSpeed >= 0) {
                this.carSpeed += 0.1 * this.carAcceleration;
            }
            if (this.carSpeed < 0) {
                this.carSpeed += 5;
            }
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            if (this.carRotation > -0.03) {
                if (this.carSpeed < 0) {
                    this.carRotation += (this.maxRotation * (this.carSpeed * 2))
                } else {
                    this.carRotation += (-this.maxRotation * (this.carSpeed * 2))

                }
            }
            this.isRotating = true
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
            if (this.carRotation < 0.03) {
                if (this.carSpeed < 0) {
                    this.carRotation -= (this.maxRotation * (this.carSpeed * 2))
                } else {
                    this.carRotation -= (-this.maxRotation * (this.carSpeed * 2))

                }
            }
            this.isRotating = true
        }

        if (this.carSpeed > 0 || this.carSpeed < 0) {
            this.isDriving = true;
        }


        // if (this.isRotating === false) {
        if (this.carRotation > -0.005 && this.carRotation < 0.005) {
            this.carRotation = 0
        }
        if (this.carRotation > 0) {
            this.carRotation -= 0.0025
        }
        if (this.carRotation < 0) {
            this.carRotation += 0.0025
        }
        // }
        if (this.isDriving === false) {
            this.carRotation = 0;
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

        this.on('collisionstart', () => {
            this.carSpeed = 0
            this.maxRotation = 0.00005
            this.temporaryMaxSpeed = this.maxSpeed / 9;
        })

        this.on('collisionend', () => {
            this.temporaryMaxSpeed = this.maxSpeed;
            this.maxRotation = 0.00002
        })


        // Get the canvas element from the game's drawing surface
        let canvas = engine.canvas;

    // Verify that the canvas element is available
        if (canvas) {
            // Get the WebGL rendering context
            let gl = canvas.getContext("webgl2");

            // Verify that the WebGL rendering context is available
            if (gl) {
                // Get the position and dimensions of the actor
                let actorX = this.pos.x;
                let actorY = this.pos.y;
                let actorWidth = this.width;
                let actorHeight = this.height;

                // Convert the actor's position from world coordinates to canvas coordinates
                let canvasActor = engine.worldToScreenCoordinates(new Vector(actorX, actorY));

                // Make sure the dimensions are valid
                if (actorWidth > 0 && actorHeight > 0) {
                    // Create an array to store the pixel data
                    let pixelData = new Uint8Array(actorWidth * actorHeight * 4);

                    // Read the pixels from the WebGL context
                    gl.readPixels(
                        canvasActor.x,
                        canvasActor.y,
                        actorWidth,
                        actorHeight,
                        gl.RGBA,
                        gl.UNSIGNED_BYTE,
                        pixelData
                    );

                    // Assuming the actor is covering a single pixel, get the RGB values
                    let red = pixelData[0];
                    let green = pixelData[1];
                    let blue = pixelData[2];

                    // Convert RGB values to a hex string
                    let hex = "#" + ("000000" + ((red << 16) | (green << 8) | blue).toString(16)).slice(-6);

                    console.log("Color underneath actor:", hex);
                }
            }
        }


    }
}