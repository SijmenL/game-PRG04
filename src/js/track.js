import {Actor, Input, Vector, Transform, Debug, Color} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";


export class Track extends Actor {
    constructor() {
        super()
        this.graphics.use(Resources.Track.toSprite());
        this.pos = new Vector(0, 0)
    }
}