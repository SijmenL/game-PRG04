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
    FontUnit, ScreenElement, EdgeCollider, Timer
} from "excalibur";
import {Track} from "./track.js";
import {Car} from "./car.js";
import {Pion} from "./pion.js";
import {Tire} from "./tire.js";
import {Wall} from "./wall.js";
import {Detector} from "./detectors.js";

import {CameraMovement} from "./camera.js";
import {Resources} from "./resources.js";


export class TrackBeach extends CameraMovement {
    car;
    music = Resources.beachMusic;
    coinsLabel;
    timer;
    time;
    clock = 0;
    seconds = 0;
    minutes = 0;
    formattedTime;
    timerLabel;

    constructor() {
        super();
        Physics.useRealisticPhysics();
    }

    onActivate(engine) {
        this.car = new Car();
        this.car.z = 1000;
        this.car.pos = new Vector(-400, -710);
        this.car.rotation = 9.5;
        this.add(this.car);

        this.camera.strategy.elasticToActor(this.car, 0.5, 0.75);
        this.zoom = this.car.defaultCameraZoom;


        this.music.stop()
        this.music.loop = true;
        this.music.play();
        this.music.volume = 1

        let backgroundColor = new Color(0, 112, 5);

        this.engine.backgroundColor = backgroundColor;

        this.time = 0;
        this.clock = 0;
        this.timer = new Timer({
            fcn: () => this.addMS(engine),
            interval: 1,
            repeats: true
        });
        this.add(this.timer);
        this.timer.start();

        this.timerLabel = new Label({
            pos: new Vector(-550, -810),
            font: new Font({
                family: 'impact',
                size: 45,
                unit: FontUnit.Px,
                color: Color.White,
                shadow: {
                    blur: 2,
                    offset: new Vector(2, 2),
                    color: '#323232',
                }
            })
        });
        this.timerLabel.z = 100000
        this.timerLabel.body.width = 200
        this.timerLabel.body.height = 200
        this.add(this.timerLabel);


        let track = new Track();
        this.add(track);

        let finish = new Actor();

        finish.graphics.use(Resources.FinishLine.toSprite());
        finish.z = 1001;
        finish.pos = new Vector(-500, -705);
        finish.scale = new Vector(0.48, 0.48);
        finish.rotation = 4.7;
        this.add(finish);

        let finishDetector = new Detector('finish', 625, -500, 825, -500, 4.7);
        this.add(finishDetector);

        let halfDetector = new Detector('midpoint', -1200, -100, -2000, -100, 4.7);
        this.add(halfDetector);


        for (let i = 0; i < 10; i++) {
            let pion = new Pion();
            this.add(pion);

            let tire = new Tire();
            this.add(tire);

        }

        let wall = new Wall(-550, -540, 350, -682);
        this.add(wall);
        let wall2 = new Wall(-440, -550, -400, -75);
        this.add(wall2);
        let wall3 = new Wall(775, -675, 520, -375);
        this.add(wall3);

        console.log(this.camera)
        console.log('1')
    }

    addMS() {
        this.clock++;

        this.time = this.clock;

        this.seconds = Math.floor((this.time / 100) % 60);
        this.minutes = Math.floor((this.time / 100 / 60) % 60);

        this.formattedTime = [
            this.minutes.toString().padStart(2, "0"),
            this.seconds.toString().padStart(2, "0")
        ].join(":");

        this.timerLabel.text = `${this.formattedTime}`;

    }

    onPreUpdate(engine, delta) {
        if (this.engine.raceFinished && this.engine.raceMiddle) {
            this.engine.goToScene('endScreen', { time: this.clock })        }
    }

    onDeactivate(_context) {

        this.music.volume = 0
        this.music.stop()

        this.camera.clearAllStrategies()


        this.engine.raceFinished = false
        this.engine.raceMiddle = false
        this.clear()
    }
}
