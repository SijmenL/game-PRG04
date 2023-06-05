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
    Shape, CollisionType, Input, PointerSystem, TextAlign, Delay, Rectangle
} from "excalibur";

import {Resources, ResourceLoader} from "./resources.js";
import {Wall} from "./wall.js";

export class Garage extends Scene {

    constructor() {
        super();
    }

    delay;

    car;
    coinsLabel;

    engineLabel;
    addEngineUpgradesLabel;
    removeEngineUpgradesLabel;
    subtractEngineUpgrades;

    turboLabel;
    addTurboUpgradesLabel;
    removeTurboUpgradesLabel;
    subtractTurboUpgrades;

    tireLabel;
    addTireUpgradesLabel;
    removeTireUpgradesLabel;
    subtractTireUpgrades;

    horsePowerLabel;
    addHorsePowerUpgradesLabel;
    removeHorsePowerUpgradesLabel;
    subtractHorsePowerUpgrades;

    noMoneyLabel;
    fadeOutAnimation;

    music = Resources.garageMusic;

    onInitialize(engine) {
        console.log('garage');
        const background = new Actor();
        background.graphics.use(Resources.Garage.toSprite());
        background.pos = new Vector(775, 500);
        background.scale = new Vector(1.7, 1.7);
        background.z = 0;
        this.add(background);
        this.music.loop = true;
        this.music.play();


        const fadeOut = new Rectangle({
            width: 2000,
            height: 2000,
            color: Color.Black,
        });

        this.fadeOutAnimation = new Actor();
        this.fadeOutAnimation.graphics.use(fadeOut);
        this.fadeOutAnimation.z = 1000;
        this.fadeOutAnimation.opacity = 0.99
        this.fadeOutAnimation.pos = new Vector(775, 500);
        this.fadeOutAnimation.actions
            .delay(1000)
            .fade(0, 4000);
        this.add(this.fadeOutAnimation);


        this.car = new Actor();
        this.car.graphics.use(Resources.Car.toSprite());
        this.car.pos = new Vector(725, 400);
        this.car.scale = new Vector(0.9, 0.9);
        this.add(this.car);


        // Display the amount of coins the player has
        const coins = new Actor();
        coins.graphics.use(Resources.Coin.toSprite());
        coins.pos = new Vector(150, 50);
        coins.scale = new Vector(0.5, 0.5);
        this.add(coins);
        this.coinsLabel = new Label({
            pos: new Vector(175, 65),
            font: new Font({
                family: 'impact',
                size: 45,
                unit: FontUnit.Px,
                color: Color.White,
            })
        });
        this.add(this.coinsLabel);

        // add the button to start the race
        const startRace = new Actor();
        startRace.graphics.use(Resources.StartRace.toSprite());
        startRace.pos = new Vector(1230, 75);
        startRace.scale = new Vector(0.75, 0.75);
        startRace.enableCapturePointer = true;
        startRace.pointer.useGraphicsBounds = true;
        startRace.on("pointerup", (event) => this.startRaceScene());
        this.add(startRace);


        // Engine upgrade button
        const engineUpgrade = new Actor();
        engineUpgrade.graphics.use(Resources.EngineUpgrade.toSprite());
        engineUpgrade.pos = new Vector(250, 300);
        engineUpgrade.scale = new Vector(0.75, 0.75);
        this.add(engineUpgrade);
        this.engineLabel = new Label({
            pos: new Vector(250, 355),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: TextAlign.Center,
                shadow: {
                    blur: 2,
                    offset: new Vector(2, 2),
                    color: '#323232',
                }
            }),
        });
        this.add(this.engineLabel);
        const addEngineUpgrades = new Actor();
        addEngineUpgrades.graphics.use(Resources.Add.toSprite());
        addEngineUpgrades.pos = new Vector(410, 275);
        addEngineUpgrades.scale = new Vector(0.75, 0.75);
        addEngineUpgrades.enableCapturePointer = true;
        addEngineUpgrades.pointer.useGraphicsBounds = true;
        addEngineUpgrades.on("pointerup", (event) => this.addEngineUpgrades());
        this.add(addEngineUpgrades);
        this.addEngineUpgradesLabel = new Label({
            pos: new Vector(410, 350),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: TextAlign.Center,
            })
        });
        this.add(this.addEngineUpgradesLabel);
        this.subtractEngineUpgrades = new Actor();
        this.subtractEngineUpgrades.graphics.use(Resources.Subtract.toSprite());
        this.subtractEngineUpgrades.pos = new Vector(95, 275);
        this.subtractEngineUpgrades.scale = new Vector(0.75, 0.75);
        this.subtractEngineUpgrades.enableCapturePointer = true;
        this.subtractEngineUpgrades.pointer.useGraphicsBounds = true;
        this.subtractEngineUpgrades.on("pointerup", (event) => this.removeEngineUpgrades());
        this.add(this.subtractEngineUpgrades);
        this.removeEngineUpgradesLabel = new Label({
            pos: new Vector(95, 350),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: TextAlign.Center,
            })
        });
        this.add(this.removeEngineUpgradesLabel);


        // Turbo upgrade button
        const turboUpgrade = new Actor();
        turboUpgrade.graphics.use(Resources.TurboUpgrade.toSprite());
        turboUpgrade.pos = new Vector(250, 550);
        turboUpgrade.scale = new Vector(0.75, 0.75);
        this.add(turboUpgrade);
        this.turboLabel = new Label({
            pos: new Vector(250, 605),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: TextAlign.Center,
                shadow: {
                    blur: 2,
                    offset: new Vector(2, 2),
                    color: '#323232',
                }
            }),
        });
        this.add(this.turboLabel);
        const addTurboUpgrades = new Actor();
        addTurboUpgrades.graphics.use(Resources.Add.toSprite());
        addTurboUpgrades.pos = new Vector(410, 525);
        addTurboUpgrades.scale = new Vector(0.75, 0.75);
        addTurboUpgrades.enableCapturePointer = true;
        addTurboUpgrades.pointer.useGraphicsBounds = true;
        addTurboUpgrades.on("pointerup", (event) => this.addTurboUpgrades());
        this.add(addTurboUpgrades);
        this.addTurboUpgradesLabel = new Label({
            pos: new Vector(410, 600),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: TextAlign.Center,
            })
        });
        this.add(this.addTurboUpgradesLabel);
        this.subtractTurboUpgrades = new Actor();
        this.subtractTurboUpgrades.graphics.use(Resources.Subtract.toSprite());
        this.subtractTurboUpgrades.pos = new Vector(95, 525);
        this.subtractTurboUpgrades.scale = new Vector(0.75, 0.75);
        this.subtractTurboUpgrades.enableCapturePointer = true;
        this.subtractTurboUpgrades.pointer.useGraphicsBounds = true;
        this.subtractTurboUpgrades.on("pointerup", (event) => this.removeTurboUpgrades());
        this.add(this.subtractTurboUpgrades);
        this.removeTurboUpgradesLabel = new Label({
            pos: new Vector(95, 600),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: TextAlign.Center,
            })
        });
        this.add(this.removeTurboUpgradesLabel);


        // Tire upgrade button
        const tireUpgrade = new Actor();
        tireUpgrade.graphics.use(Resources.TireUpgrade.toSprite());
        tireUpgrade.pos = new Vector(1250, 300);
        tireUpgrade.scale = new Vector(0.75, 0.75);
        this.add(tireUpgrade);
        this.tireLabel = new Label({
            pos: new Vector(1250, 355),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: TextAlign.Center,
                shadow: {
                    blur: 2,
                    offset: new Vector(2, 2),
                    color: '#323232',
                }
            }),
        });
        this.add(this.tireLabel);
        const addTireUpgrades = new Actor();
        addTireUpgrades.graphics.use(Resources.Add.toSprite());
        addTireUpgrades.pos = new Vector(1410, 275);
        addTireUpgrades.scale = new Vector(0.75, 0.75);
        addTireUpgrades.enableCapturePointer = true;
        addTireUpgrades.pointer.useGraphicsBounds = true;
        addTireUpgrades.on("pointerup", (event) => this.addTireUpgrades());
        this.add(addTireUpgrades);
        this.addTireUpgradesLabel = new Label({
            pos: new Vector(1410, 350),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: TextAlign.Center,
            })
        });
        this.add(this.addTireUpgradesLabel);
        this.subtractTireUpgrades = new Actor();
        this.subtractTireUpgrades.graphics.use(Resources.Subtract.toSprite());
        this.subtractTireUpgrades.pos = new Vector(1095, 275);
        this.subtractTireUpgrades.scale = new Vector(0.75, 0.75);
        this.subtractTireUpgrades.enableCapturePointer = true;
        this.subtractTireUpgrades.pointer.useGraphicsBounds = true;
        this.subtractTireUpgrades.on("pointerup", (event) => this.removeTireUpgrades());
        this.add(this.subtractTireUpgrades);
        this.removeTireUpgradesLabel = new Label({
            pos: new Vector(1095, 350),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: TextAlign.Center,
            })
        });
        this.add(this.removeTireUpgradesLabel);

        // HorsePower upgrade button
        const horsePowerUpgrade = new Actor();
        horsePowerUpgrade.graphics.use(Resources.HorsePowerUpgrade.toSprite());
        horsePowerUpgrade.pos = new Vector(1250, 550);
        horsePowerUpgrade.scale = new Vector(0.75, 0.75);
        this.add(horsePowerUpgrade);
        this.horsePowerLabel = new Label({
            text: `Level ${this.engine.updateHorsePowerUpgrade(0)}`,
            pos: new Vector(1250, 605),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: TextAlign.Center,
                shadow: {
                    blur: 2,
                    offset: new Vector(2, 2),
                    color: '#323232',
                }
            }),
        });
        this.add(this.horsePowerLabel);
        const addHorsePowerUpgrades = new Actor();
        addHorsePowerUpgrades.graphics.use(Resources.Add.toSprite());
        addHorsePowerUpgrades.pos = new Vector(1410, 525);
        addHorsePowerUpgrades.scale = new Vector(0.75, 0.75);
        addHorsePowerUpgrades.enableCapturePointer = true;
        addHorsePowerUpgrades.pointer.useGraphicsBounds = true;
        addHorsePowerUpgrades.on("pointerup", (event) => this.addHorsePowerUpgrades());
        this.add(addHorsePowerUpgrades);
        this.addHorsePowerUpgradesLabel = new Label({
            text: `${(this.engine.horsePowerUpgrade + 1) * 50}`,
            pos: new Vector(1410, 600),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: TextAlign.Center,
            })
        });
        this.add(this.addHorsePowerUpgradesLabel);
        this.subtractHorsePowerUpgrades = new Actor();
        this.subtractHorsePowerUpgrades.graphics.use(Resources.Subtract.toSprite());
        this.subtractHorsePowerUpgrades.pos = new Vector(1095, 525);
        this.subtractHorsePowerUpgrades.scale = new Vector(0.75, 0.75);
        this.subtractHorsePowerUpgrades.enableCapturePointer = true;
        this.subtractHorsePowerUpgrades.pointer.useGraphicsBounds = true;
        this.subtractHorsePowerUpgrades.on("pointerup", (event) => this.removeHorsePowerUpgrades());
        this.add(this.subtractHorsePowerUpgrades);
        this.removeHorsePowerUpgradesLabel = new Label({
            text: `${(this.engine.horsePowerUpgrade) * 50}`,
            pos: new Vector(1095, 600),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: TextAlign.Center,
            })
        });
        this.add(this.removeHorsePowerUpgradesLabel);

        this.updateLabels();
    }


    addEngineUpgrades() {
        if (this.engine.coins >= (this.engine.engineUpgrade + 1) * 50) {
            this.engine.updateEngineUpgrade(1);
            this.engine.updateCoins(-1 * (this.engine.engineUpgrade * 50));
            this.updateLabels();
        } else {
            this.noMoney();
        }
    }

    removeEngineUpgrades() {
        if (this.engine.coins >= this.engine.engineUpgrade * 50 && this.engine.engineUpgrade > 0) {
            this.engine.updateEngineUpgrade(-1);
            this.engine.updateCoins(-1 * ((this.engine.engineUpgrade + 1) * 50));
            this.updateLabels();
        } else {
            this.noMoney();
        }
    }

    addTurboUpgrades() {
        if (this.engine.coins >= (this.engine.turboUpgrade + 1) * 100) {
            this.engine.updateTurboUpgrade(1);
            this.engine.updateCoins(-1 * (this.engine.turboUpgrade * 100));
            this.updateLabels();
        } else {
            this.noMoney();
        }
    }

    removeTurboUpgrades() {
        if (this.engine.coins >= this.engine.turboUpgrade * 100 && this.engine.turboUpgrade > 0) {
            this.engine.updateTurboUpgrade(-1);
            this.engine.updateCoins(-1 * ((this.engine.turboUpgrade + 1) * 100));
            this.updateLabels();
        } else {
            this.noMoney();
        }
    }

    addTireUpgrades() {
        if (this.engine.coins >= (Math.ceil(Math.pow(this.engine.tireUpgrade + 1, 2.25)))) {
            this.engine.updateTireUpgrade(1);
            this.engine.updateCoins(-1 * (Math.ceil(Math.pow(this.engine.tireUpgrade, 2.25))));
            this.updateLabels();
        } else {
            this.noMoney();
        }
    }

    removeTireUpgrades() {
        if (this.engine.coins >= (Math.ceil(Math.pow(this.engine.tireUpgrade, 2.25))) && this.engine.tireUpgrade > 0) {
            this.engine.updateTireUpgrade(-1);
            this.engine.updateCoins(-1 * (Math.ceil(Math.pow(this.engine.tireUpgrade + 1, 2.25))));
            this.updateLabels();
        } else {
            this.noMoney();
        }
    }

    addHorsePowerUpgrades() {
        if (this.engine.coins >= (Math.ceil(Math.pow(this.engine.horsePowerUpgrade + 1, 3)))) {
            this.engine.updateHorsePowerUpgrade(1);
            this.engine.updateCoins(-1 * (Math.ceil(Math.pow(this.engine.horsePowerUpgrade, 3))));
            this.updateLabels();
        } else {
            this.noMoney();
        }
    }

    removeHorsePowerUpgrades() {
        if (this.engine.coins >= (Math.ceil(Math.pow(this.engine.horsePowerUpgrade, 3))) && this.engine.horsePowerUpgrade > 0) {
            this.engine.updateHorsePowerUpgrade(-1);
            this.engine.updateCoins(-1 * (Math.ceil(Math.pow(this.engine.horsePowerUpgrade + 1, 3))));
            this.updateLabels();
        } else {
            this.noMoney();
        }
    }


    updateLabels() {
        // update coins
        this.coinsLabel.text = this.engine.updateCoins(0);

        //update engine labels
        this.engineLabel.text = `Level ${this.engine.engineUpgrade}`;
        this.addEngineUpgradesLabel.text = `${(this.engine.engineUpgrade + 1) * 50}`;
        this.removeEngineUpgradesLabel.text = `${(this.engine.engineUpgrade) * 50}`;

        //update turbo labels
        this.turboLabel.text = `Level ${this.engine.turboUpgrade}`;
        this.addTurboUpgradesLabel.text = `${(this.engine.turboUpgrade + 1) * 100}`;
        this.removeTurboUpgradesLabel.text = `${(this.engine.turboUpgrade) * 100}`;

        //update tire labels
        this.tireLabel.text = `Level ${this.engine.tireUpgrade}`;
        this.addTireUpgradesLabel.text = `${Math.ceil(Math.pow((this.engine.tireUpgrade + 1), 2.25))}`;
        this.removeTireUpgradesLabel.text = `${Math.ceil(Math.pow(this.engine.tireUpgrade, 2.25))}`;

        //update horse power labels
        this.horsePowerLabel.text = `Level ${this.engine.horsePowerUpgrade}`;
        this.addHorsePowerUpgradesLabel.text = `${Math.ceil(Math.pow((this.engine.horsePowerUpgrade + 1), 3))}`;
        this.removeHorsePowerUpgradesLabel.text = `${Math.ceil(Math.pow(this.engine.horsePowerUpgrade, 3))}`;
    }

    noMoney() {
        this.noMoneyLabel = new Label({
            pos: new Vector(745, 600),
            text: `Not enough money!`,
            font: new Font({
                family: 'impact',
                size: 60,
                unit: FontUnit.Px,
                color: Color.Red,
                textAlign: TextAlign.Center,
                shadow: {
                    blur: 2,
                    offset: new Vector(2, 2),
                    color: Color.Black,
                }
            })
        });
        this.noMoneyLabel.actions
            .delay(1000)
            .fade(0, 500);
        this.add(this.noMoneyLabel);
    }

    startRaceScene() {
        this.fadeOutAnimation.actions
            .fade(1, 4000);
        this.chooseTrack()
    }

    chooseTrack() {
        let randomTrack = Math.random() * (0 - 0) + 0;

        if (randomTrack === 0) {
            this.engine.goToScene('trackBeach');
        }
    }

    onPreUpdate(_engine, _delta) {
        this.car.rotation += 0.0025;
        if (this.engine.engineUpgrade < 1) {
            this.subtractEngineUpgrades.scale = new Vector(0, 0);
            this.removeEngineUpgradesLabel.scale = new Vector(0, 0);
        } else {
            this.subtractEngineUpgrades.scale = new Vector(0.75, 0.75);
            this.removeEngineUpgradesLabel.scale = new Vector(1, 1);
        }

        if (this.engine.turboUpgrade < 1) {
            this.subtractTurboUpgrades.scale = new Vector(0, 0);
            this.removeTurboUpgradesLabel.scale = new Vector(0, 0);
        } else {
            this.subtractTurboUpgrades.scale = new Vector(0.75, 0.75);
            this.removeTurboUpgradesLabel.scale = new Vector(1, 1);
        }
        if (this.engine.tireUpgrade < 1) {
            this.subtractTireUpgrades.scale = new Vector(0, 0);
            this.removeTireUpgradesLabel.scale = new Vector(0, 0);
        } else {
            this.subtractTireUpgrades.scale = new Vector(0.75, 0.75);
            this.removeTireUpgradesLabel.scale = new Vector(1, 1);
        }
        if (this.engine.horsePowerUpgrade < 1) {
            this.subtractHorsePowerUpgrades.scale = new Vector(0, 0);
            this.removeHorsePowerUpgradesLabel.scale = new Vector(0, 0);
        } else {
            this.subtractHorsePowerUpgrades.scale = new Vector(0.75, 0.75);
            this.removeHorsePowerUpgradesLabel.scale = new Vector(1, 1);
        }

        if (this.noMoneyLabel) {
            if (this.noMoneyLabel.opacity === 0) {
                this.noMoneyLabel.kill();
            }
        }
    }

    onDeactivate() {
        this.music.stop();
    }


}
