import {Actor, Input, Vector, Transform, Debug, Color, Shape, CollisionType, Physics} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";


export class Pion extends Actor {
    constructor() {
        super()
        this.scale = new Vector(0.2, 0.2);
        this.graphics.use(Resources.Pion.toSprite());
        this.pos = new Vector(Math.random() * (100 - -100) + -100, Math.random() * (100 - -100) + -100)
        this.collider.set(Shape.Box(175, 175));
        this.body.collisionType = CollisionType.Active;
        this.body.friction = 0.99;
        this.body.mass = 1000;
        this.body.useGravity = false


    }

    onPreUpdate(_engine, _delta) {

        if (this.vel.x > 0) {
            this.vel.x -= 5
        }
        if (this.vel.x < 0) {
            this.vel.x += 5
        }
        if (this.vel.y > 0) {
            this.vel.y -= 5
        }
        if (this.vel.y < 0) {
            this.vel.y += 5
        }

        if (this.body.angularVelocity > 0) {
            this.body.angularVelocity -= 0.005
        }
        if (this.body.angularVelocity < 0) {
            this.body.angularVelocity += 0.005
        }


        if (this.vel.x < 5 && this.vel.x > -5) {
            this.vel.x = 0
        }
        if (this.vel.y < 5 && this.vel.y > -5) {
            this.vel.y = 0
        }
        if (this.body.angularVelocity < 0.005 && this.body.angularVelocity > -0.005) {
            this.body.angularVelocity = 0
        }



    }
}