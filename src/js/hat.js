import {Actor, Input, Vector, Transform, Debug, Color, Shape, Collider, CollisionType, Physics} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";


export class Hat extends Actor {


    constructor() {
        super();

        this.graphics.use(Resources.Hat.toSprite());

        this.pos = new Vector(0, 0);
        this.scale = new Vector(0.7, 0.7);
        this.body.useGravity = false;
        this.z = 1000000
    }
}