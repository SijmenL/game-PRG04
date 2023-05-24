import { ImageSource, Sound, Resource, Loader } from "excalibur";
import track from "../images/track.png";
import car from "../images/car.png";
import pion from "../images/pion.png";
import wall from "../images/wall.png";


const Resources = {
    Track: new ImageSource(track),
    Car: new ImageSource(car),
    Pion: new ImageSource(pion),
    Wall: new ImageSource(wall),
};

const ResourceLoader = new Loader([
    Resources.Track,
    Resources.Car,
    Resources.Pion,
    Resources.Wall,
]);

export { Resources, ResourceLoader };
