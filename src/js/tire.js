import {Actor, Input, Vector, Transform, Debug, Color, Shape, CollisionType, Physics} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";
import {Object} from "./object.js";


export class Tire extends Object {
    constructor() {
        super()

        this._setName('tire')


        this.scale = new Vector(0.2, 0.2);
        this.graphics.use(Resources.Tire.toSprite());
        this.pos = new Vector(Math.random() * (-100 - -200) + -200, Math.random() * (-100 - -200) + -200)
        this.collider.set(Shape.Circle(110));
        this.body.collisionType = CollisionType.Active;
        this.body.friction = 1;
        this.body.mass = 10000;
        this.body.useGravity = false


    }
}