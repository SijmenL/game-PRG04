import {
    Actor,
    Engine,
    Vector,
    Label,
    Color,
    Font,
    Debug,
    Transform,
    Screen,
    Scene,
    Camera,
    DisplayMode
} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";
import {Level} from "./scene.js"


export class Game extends Engine {

    constructor() {
        super({width: 1440, height: 900, displayMode: DisplayMode.FillScreen});
        this.start(ResourceLoader).then(() => this.startGame());
        // this.showDebug(true);
        this.add('level', new Level());

        this.debug.motion = {
            accelerationColor: Color.Azure,
            showAcceleration: true,
            showAll: true,
            showVelocity: true,
            velocityColor: Color.Green,
        };
    }

    onInitialize(engine) {
        this.game = engine;
        this.goToScene('level')
    }


}
new Game();
