import { ImageSource, Sound, Resource, Loader, Color } from "excalibur";
import track from "../images/track.png";
import car from "../images/car.png";
import pion from "../images/pion.png";
import tire from "../images/tire.png";
import logo from "../images/logo.png";
import buttonRace from "../images/button-race.png";
import startRace from "../images/start_race.png";

import garage from "../images/garage.png";
import coin from "../images/coin.png";

import engineUpgrade from "../images/engine_upgrade.png";
import turboUpgrade from "../images/turbo_upgrade.png";
import tireUpgrade from "../images/tire_upgrade.png";
import horsePowerUpgrade from "../images/horse_power_upgrade.png";

import add from "../images/add.png";
import subtrackt from "../images/subtrackt.png";


import buttonPractise from "../images/button-practise.png";

import menuMusic from "../sounds/menu.mp3";
import garageMusic from "../sounds/garage.mp3";
import beachMusic from "../sounds/beach.mp3";

const Resources = {
    Track: new ImageSource(track),
    Garage: new ImageSource(garage),

    Car: new ImageSource(car),
    Pion: new ImageSource(pion),
    Tire: new ImageSource(tire),
    Logo: new ImageSource(logo),
    Coin: new ImageSource(coin),

    EngineUpgrade: new ImageSource(engineUpgrade),
    TurboUpgrade: new ImageSource(turboUpgrade),
    TireUpgrade: new ImageSource(tireUpgrade),
    HorsePowerUpgrade: new ImageSource(horsePowerUpgrade),

    Add: new ImageSource(add),
    Subtract: new ImageSource(subtrackt),


    Race: new ImageSource(buttonRace),
    Practise: new ImageSource(buttonPractise),
    StartRace: new ImageSource(startRace),

    menuMusic: new Sound(menuMusic),
    garageMusic: new Sound(garageMusic),
    beachMusic: new Sound(beachMusic),


};

const ResourceLoader = new Loader([
    Resources.Track,
    Resources.Car,
    Resources.Pion,
    Resources.Tire,
    Resources.Logo,
    Resources.Race,
    Resources.Practise,
    Resources.StartRace,
    Resources.Garage,
    Resources.Coin,

    Resources.EngineUpgrade,
    Resources.TurboUpgrade,
    Resources.TireUpgrade,
    Resources.HorsePowerUpgrade,

    Resources.Add,
    Resources.Subtract,

    Resources.menuMusic,
    Resources.garageMusic,
    Resources.beachMusic,
]);

ResourceLoader.logo = logo
ResourceLoader.logoWidth = 898
ResourceLoader.logoHeight = 252
ResourceLoader.backgroundColor = Color.white
ResourceLoader.loadingBarColor = '#6d6869'
ResourceLoader.suppressPlayButton = false


export { Resources, ResourceLoader };
