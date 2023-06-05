import {Scene, Camera} from "excalibur";


export class CameraMovement extends Scene {
    car;

    constructor() {
        super();
        this.camera = new Camera();
    }

    onPreUpdate(engine, delta) {

        if (this.car.carSpeed > 0) {

            if (this.zoom > this.car.defaultCameraZoom - (this.car.carSpeed / this.car.cameraZoom)) {
                this.zoom -= 0.0025
            }
            if (this.zoom < this.car.defaultCameraZoom - (this.car.carSpeed / this.car.cameraZoom)) {
                this.zoom += 0.0025
            }

        } else {

            if (this.zoom > this.car.defaultCameraZoom - (-1 * (this.car.carSpeed / this.car.cameraZoom))) {
                this.zoom -= 0.0025
            }
            if (this.zoom < this.car.defaultCameraZoom - (-1 * (this.car.carSpeed / this.car.cameraZoom))) {
                this.zoom += 0.0025
            }
        }

        if (this.zoom > this.car.defaultCameraZoom - 0.0025 && this.zoom < this.car.defaultCameraZoom + 0.0025) {
            this.zoom = this.car.defaultCameraZoom;
        }

        if (this.zoom < this.car.maxCameraZoom) {
            this.zoom = this.car.maxCameraZoom
        }



        this.camera.zoom = Math.round(this.zoom * 1000) / 1000;
    }

}
