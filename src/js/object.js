import {Actor, Input, Vector, Transform, Debug, Color, Shape, CollisionType, Physics} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";


export class Object extends Actor {
    constructor() {
        super()
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