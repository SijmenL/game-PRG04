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
    Physics,
    Sound,
    FontUnit,
    Shape, CollisionType, Input, PointerSystem
} from "excalibur";

import {Resources, ResourceLoader} from "./resources.js";
import {Wall} from "./wall.js";

export class Menu extends Scene {

    constructor() {
        super();
        Physics.useRealisticPhysics();
        Physics.gravity = new Vector(0, 200);

    }

    music = Resources.menuMusic;

    onActivate(_context) {
        this.music.stop()
        this.music.volume = 1
        this.engine.backgroundColor = Color.White;
        this.music.loop = true;
        this.music.play();
    }

    onInitialize(engine) {
        // logo & buttons
        const logo = new Actor();
        logo.graphics.use(Resources.Logo.toSprite());
        logo.pos = new Vector(750, 150);
        logo.scale = new Vector(0.75, 0.75);
        logo.z = 1000;
        this.add(logo);

        const race = new Actor();
        race.graphics.use(Resources.Race.toSprite());
        race.pos = new Vector(750, 350);
        race.scale = new Vector(0.75, 0.75);
        race.z = 1000;
        race.enableCapturePointer = true;
        race.pointer.useGraphicsBounds = true;
        race.on("pointerup", (event) => this.startRace());
        this.add(race);


        const practise = new Actor();
        let practiseButton = Resources.Practise.toSprite()
        practiseButton.tint = new Color(100, 100, 100)
        practise.graphics.use(practiseButton);
        practise.pos = new Vector(750, 500);
        practise.scale = new Vector(0.75, 0.75);
        practise.z = 1000;
        practise.enableCapturePointer = true;
        practise.pointer.useGraphicsBounds = true;
        practise.on("pointerup", (event) => this.startPractise());
        this.add(practise);


        // tires & physics

        let wall = new Wall(-1000, 500, 2000, 800);
        this.add(wall);
        let wall2 = new Wall(-1000, 800, 2000, 500);
        this.add(wall2);


        let tire;
        for (let i = 0; i < 20; i++) {

            tire = new Actor();
            tire.graphics.use(Resources.Tire.toSprite());

            tire.draggable = true;
            tire.body.bounciness = 0.99;
            tire.scale = new Vector(0.2, 0.2);
            tire.graphics.use(Resources.Tire.toSprite());
            tire.pos = new Vector(Math.random() * (200 - 250) + 200, Math.random() * (-200 - -250) + -200);
            tire.collider.set(Shape.Circle(110));
            tire.body.collisionType = CollisionType.Active;
            tire.body.friction = 0;
            tire.body.mass = 10000;
            tire.body.useGravity = true;
            this.add(tire);
        }

        // tire.on("pointerdown", () => {
        //     tire.dragged = true;
        // })
        // tire.on("pointerup", () => {
        //     tire.body.useGravity =
        //         tire.dragged = false;
        // })
        // tire.on("pointermove", () => {
        //     if (tire.dragged === true) {
        //         tire.body.useGravity = false
        //         tire.vel = 0
        //     }
        // })


    }

    startRace() {
        console.log('start race');
        this.engine.goToScene('garage');
    }

    startPractise() {
        console.log('start practise');
    }

    onDeactivate() {
        this.music.stop();
        this.music.volume = 0
    }
}
