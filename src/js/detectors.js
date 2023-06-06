import {Actor, Input, Vector, Transform, Debug, Color, Shape, CollisionType, EdgeCollider} from "excalibur";


export class Detector extends Actor {
    constructor(name, startX, startY, endX, endY, rotation) {
        super()

        this._setName(name)

        this.pos = new Vector(0, 0)
        this.rotation = rotation;

        const box = new EdgeCollider({
            begin: new Vector(startX, startY),
            end: new Vector(endX, endY),
        })
        this.collider.set(box);
        this.body.collisionType = CollisionType.Passive;

    }
}