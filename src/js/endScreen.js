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
    FontUnit, ScreenElement, EdgeCollider, Timer, TextAlign
} from "excalibur";
import {Resources} from "./resources.js";


export class EndScreen extends Scene {

    MS
    coins
    time
    music = Resources.endMusic;

    constructor() {
        super();
    }

    onActivate(ctx) {
        console.log(ctx.data.time)

        this.time = Number(ctx.data.time);

        this.MS = this.time

        this.seconds = Math.floor((this.MS / 100) % 60);
        this.minutes = Math.floor((this.MS / 100 / 60) % 60);

        this.formattedTime = [
            this.minutes.toString().padStart(2, "0"),
            this.seconds.toString().padStart(2, "0")
        ].join(":");

        this.coins = Math.ceil(100000/(Math.random() * (this.time - this.time/200) + this.time/200))

        console.log(this.formattedTime)
        console.log(this.coins)

        this.engine.coins = this.engine.coins + this.coins

        console.log('end screen');
        const background = new Actor();
        background.graphics.use(Resources.EndScreen.toSprite());
        background.pos = new Vector(775, 350);
        background.scale = new Vector(1.5, 1.5);
        background.z = 0;
        this.add(background);
        this.music.loop = true;
        this.music.play();
        this.music.volume = 0.5



        this.timerLabel = new Label({
            text: `${this.formattedTime}`,
            pos: new Vector(730, 320),
            font: new Font({
                family: 'impact',
                size: 100,
                unit: FontUnit.Px,
                color: Color.White,
                bold: true,
                textAlign: TextAlign.Center,
                shadow: {
                    blur: 20,
                    offset: new Vector(2, 2),
                    color: Color.Black,
                }
            })
        });

        this.coinsLabel = new Label({
            text: `You have earned`,
            pos: new Vector(630, 470),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color: Color.White,
                bold: true,
                textAlign: TextAlign.Center,
                shadow: {
                    blur: 2,
                    offset: new Vector(2, 2),
                    color: Color.Black,
                }
            })
        });

        this.coinsAmountLabel = new Label({
            text: `${this.coins}!`,
            pos: new Vector(830, 470),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color: Color.White,
                bold: true,
                textAlign: TextAlign.Left,
                shadow: {
                    blur: 2,
                    offset: new Vector(2, 2),
                    color: Color.Black,
                }
            })
        });



        this.timerLabel.z = 10
        this.coinsLabel.z = 10
        this.coinsAmountLabel.z = 10


        this.add(this.timerLabel);
        this.add(this.coinsLabel);
        this.add(this.coinsAmountLabel);


        const coins = new Actor();
        coins.graphics.use(Resources.Coin.toSprite());
        coins.pos = new Vector(800, 455);
        coins.scale = new Vector(0.5, 0.5);
        this.add(coins);

        const garage = new Actor();
        garage.graphics.use(Resources.GarageButton.toSprite());
        garage.pos = new Vector(750, 600);
        garage.scale = new Vector(0.75, 0.75);
        garage.z = 1000;
        garage.enableCapturePointer = true;
        garage.pointer.useGraphicsBounds = true;
        garage.on("pointerup", (event) => this.Garage());
        this.add(garage);
    }

    Garage() {
        this.engine.goToScene('garage');
    }

    onDeactivate(_context) {
        this.clear()
        this.music.stop()
        this.music.volume = 0
    }
}
