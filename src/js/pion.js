import {Actor, Input, Vector, Transform, Debug, Color, Shape, CollisionType, Physics} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";

import {Object} from "./object.js";


export class Pion extends Object {
    constructor() {
        super()

        this._setName('cone')

        this.scale = new Vector(0.2, 0.2);
        this.graphics.use(Resources.Pion.toSprite());
        this.pos = new Vector(Math.random() * (100 - -100) + -100, Math.random() * (100 - -100) + -100)
        this.collider.set(Shape.Box(175, 175));
        this.body.collisionType = CollisionType.Active;
        this.body.friction = 0.99;
        this.body.mass = 1000;
        this.body.useGravity = false


    }
}