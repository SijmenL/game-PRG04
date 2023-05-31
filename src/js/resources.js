import { ImageSource, Sound, Resource, Loader } from "excalibur";
import track from "../images/track.png";
import car from "../images/car.png";
import pion from "../images/pion.png";
import tire from "../images/tire.png";


const Resources = {
    Track: new ImageSource(track),
    Car: new ImageSource(car),
    Pion: new ImageSource(pion),
    Tire: new ImageSource(tire),

};

const ResourceLoader = new Loader([
    Resources.Track,
    Resources.Car,
    Resources.Pion,
    Resources.Tire,
]);

export { Resources, ResourceLoader };
