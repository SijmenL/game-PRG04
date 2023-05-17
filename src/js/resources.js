import { ImageSource, Sound, Resource, Loader } from "excalibur";
import track from "../images/track.png";
import car from "../images/car.png";

const Resources = {
    Track: new ImageSource(track),
    Car: new ImageSource(car),
};

const ResourceLoader = new Loader([
    Resources.Track,
    Resources.Car
]);

export { Resources, ResourceLoader };
