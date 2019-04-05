import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import * as Tesseract from 'tesseract.js';
/**
 * Generated class for the CameraviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cameraview',
  templateUrl: 'cameraview.html',
})
export class CameraviewPage {
  picture:any;
  cameraOpts: CameraPreviewOptions = {
    x:0,
    y:0,
    width:window.innerWidth,
    height:window.innerHeight,
    toBack: true
  };
  cameraPictureOpts: CameraPreviewPictureOptions = {
    width: window.innerWidth,
    height: window.innerHeight,
    quality: 100
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public cameraPreview:CameraPreview) {
  }

  ionViewDidLoad() {
    this.startCamera();
    console.log('ionViewDidLoad CameraviewPage');
  }
  async startCamera(){
    this.picture = null;
    await this.cameraPreview.startCamera(this.cameraOpts);
  }
  switchCamera() {
    this.cameraPreview.switchCamera();
  }
  async takePicture(){
    //this.picture = "assets/imgs/1.png";
    const result = await this.cameraPreview.takePicture(this.cameraPictureOpts);
    await this.cameraPreview.stopCamera();
    this.picture = 'data:image/jpeg;base64,'+result;
  }
  
  recog() {
  	
    Tesseract.recognize(this.picture)
    .progress(message => {
      console.log(message);
    })
    .catch(err => console.error(err))
    .then(result => {
      alert(result.text);
    })
    .finally(resultOrError => {
    });
 }
}