import {Actor, Input, Vector, Transform, Debug, Color, Shape, Collider, CollisionType, Physics} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";
import {Hat} from "./hat.js";


export class Car extends Actor {

    hat
    engine;
    carRotation = 0;
    carSpeed = 0;
    carAcceleration = 0.1;
    maxSpeed = 300;
    maxAcceleration = 50;
    accelerationTime = 15;
    horsePower = 9;
    cameraZoom = 2000;

    maxCameraZoom = 0.5;
    defaultCameraZoom = 1.2;
    isRotating;
    isDriving;
    maxRotation = 0.00002;
    temporaryMaxSpeed;

    constructor() {
        super();

        // Optionele cosmetica
        // this.hat = new Hat();
        // this.addChild(this.hat)


        this.graphics.use(Resources.Car.toSprite());

        this.pos = new Vector(400, 300);
        this.scale = new Vector(0.2, 0.2);
        this.collider.set(Shape.Box(390, 180));
        this.body.collisionType = CollisionType.Active;
        this.body.friction = 0.99;
        this.body.useGravity = false;
    }

    onInitialize(engine) {
        this.engine = engine;

        this.maxSpeed = 300 + 7.5 * this.engine.engineUpgrade;
        this.accelerationTime = 15 + 5 * this.engine.turboUpgrade;
        this.maxAcceleration = 50 + 1 * this.engine.tireUpgrade;

        if (this.engine.horsePowerUpgrade * 0.5 < 9) {
            this.horsePower = 9 - 0.5 * this.engine.horsePowerUpgrade;
        } else {
            this.horsePower = 1;
        }
        this.body.mass = 10000 + 100 * this.engine.horsePowerUpgrade;


        this.temporaryMaxSpeed = this.maxSpeed;

    }

    onPreUpdate(engine, delta) {

        this.isRotating = false;
        this.isDriving = false;


        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Up)) {
            if (this.carAcceleration > -this.maxAcceleration) {
                this.carAcceleration -= this.accelerationTime / 2;
            }

            if (this.carSpeed > -this.temporaryMaxSpeed && this.carSpeed <= 0) {
                this.carSpeed -= -0.1 * this.carAcceleration;
            }
            if (this.carSpeed > 0) {
                this.carSpeed -= this.accelerationTime;
            }
        }
        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.Down)) {
            if (this.carAcceleration < this.maxAcceleration) {
                this.carAcceleration += this.accelerationTime / 2;
            }

            if (this.carSpeed < (this.temporaryMaxSpeed / 1.5) && this.carSpeed >= 0) {
                this.carSpeed += 0.1 * this.carAcceleration;
            }
            if (this.carSpeed < 0) {
                this.carSpeed += this.accelerationTime / 2;
            }
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            if (this.carRotation > -0.03) {
                if (this.carSpeed < 0) {
                    this.carRotation += (this.maxRotation * (this.carSpeed * 2));
                } else {
                    this.carRotation += (-this.maxRotation * (this.carSpeed * 2));
                }
            }
            this.isRotating = true;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
            if (this.carRotation < 0.03) {
                if (this.carSpeed < 0) {
                    this.carRotation -= (this.maxRotation * (this.carSpeed * 2));
                } else {
                    this.carRotation -= (-this.maxRotation * (this.carSpeed * 2));

                }
            }
            this.isRotating = true;
        }

        if (this.carSpeed > 0 || this.carSpeed < 0) {
            this.isDriving = true;
        }


        if (this.carRotation > -0.0005 && this.carRotation < 0.0005) {
            this.carRotation = 0;
        }
        if (this.carRotation > 0) {
            this.carRotation -= 0.00125;
        }
        if (this.carRotation < 0) {
            this.carRotation += 0.00125;
        }
        // }
        if (this.isDriving === false) {
            this.carRotation = 0;
        }

        // calculate momentum & braking
        if (this.carSpeed > 5) {
            this.carSpeed -= 5;
        } else {
            if (this.carSpeed <= 5 && this.carSpeed >= 0) {
                this.carSpeed = 0;
            }
        }

        if (this.carSpeed < -5) {
            this.carSpeed += 5;
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
        this.body.rotation = this.rotation + this.carRotation;

        this.vel = direction;


        if (this.body.angularVelocity > 0) {
            this.body.angularVelocity -= 0.1;
        }
        if (this.body.angularVelocity < 0) {
            this.body.angularVelocity += 0.1;
        }
        if (this.body.angularVelocity < 0.1 && this.body.angularVelocity > -0.1) {
            this.body.angularVelocity = 0;
        }

        this.on('collisionstart', (event) => this.hitSomething(event));

        this.on('collisionend', () => {
            this.temporaryMaxSpeed = this.maxSpeed;
            this.maxRotation = 0.00002;
        });


    }

    hitSomething(event) {
        if (event.other._name === 'wall') {
            this.carSpeed = 0;
            this.maxRotation = 0.00005;
            this.temporaryMaxSpeed = this.maxSpeed / 9;
        }

        if (event.other._name === 'tire') {
            this.carSpeed = this.carSpeed / this.horsePower;
            this.maxRotation = 0.000005;
            this.temporaryMaxSpeed = this.maxSpeed / this.horsePower;
        }
        if (event.other._name === 'cone') {
            this.carSpeed = this.carSpeed / this.horsePower;
            this.maxRotation = 0.00005;
            this.temporaryMaxSpeed = this.maxSpeed / this.horsePower;
        }
        if (event.other._name === 'midpoint') {
            this.engine.raceMiddle = true
        }

        if (event.other._name === 'finish') {
            if (this.engine.raceMiddle === true) {
                this.engine.raceFinished = true
            }
        }

    }

    onPostUpdate(engine, _delta) {
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

                    // console.log("Color underneath actor:", hex);
                }
            }
        }
    }
}