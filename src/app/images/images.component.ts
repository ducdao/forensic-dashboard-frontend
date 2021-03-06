import { CanComponentDeactivate } from './../can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';
import { ImagesService } from './images.service';
import { CasesService } from './../cases/cases.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'; 
import { Response } from '@angular/http'; 

import { MzToastService } from 'ng2-materialize';

import { BreadcrumbService } from '../breadcrumb.service';
import { ServerService } from '../server.service'; 
import { CollapsibleService } from '../collapsible.service'; 

import { Device } from '../device';
import { Case } from '../case';
import { DigitalMedia } from '../digital-media'; 
import { Image } from '../image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, CanComponentDeactivate {
  images: Image[] = [];
  caseId: number;
  userId: number;
  deviceId:number;
  digitalMediaId: number;
  paramSub: Subscription;
  savedChanges = false;

  digitalMedia = new DigitalMedia(); 
  newImage = new Image();

  constructor(private serverService: ServerService,
              private breadcrumbs: BreadcrumbService,
              private toastService: MzToastService,
              private collapsible: CollapsibleService,
              private route: ActivatedRoute, private casesService: CasesService,
              private imagesService: ImagesService) { }

  ngOnInit() {
    this.breadcrumbs.viewImages();
    this.collapsible.removeAfterDigitalMediaCollapsible();
    // grab info from ActivateRoute and store the new digitalMediaId
    // in the ImagesService.
    this.paramSub = this.route.params.subscribe(
      (params: Params) => {
        this.caseId = params['caseId'];
        this.userId = this.casesService.getUserId(); 
        this.deviceId = params['deviceId'];
        this.digitalMediaId = params['dmId'];
        this.imagesService.setDmId(this.digitalMediaId);
        // display the DigitalMedia relevant to these images in a collapsible
        // and display all images as cards.
        this.getDigitalMedia();
        this.loadImages();
      }
    );
  }

  ngAfterViewInit() {
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean { 
    for(let temp in this.newImage) {
      let value = this.newImage[temp];
      if((value !== undefined) && !this.savedChanges) {
        return confirm('You are currently editing an image, do you wish to discard')
      } 
    }  
    return true;
  }

  getDigitalMedia() {
    this.serverService.getDigitalMedia(this.userId, this.caseId, this.deviceId, this.digitalMediaId).subscribe(
      (response) => {
        let data = response.json();
        this.digitalMedia.capacity = data.capacity;
        this.digitalMedia.deviceId = data.deviceId;
        this.digitalMedia.id = data.id;
        this.digitalMedia.make = data.make;
        this.digitalMedia.model = data.model;
        this.digitalMedia.serialNumber = data.serialNumber;
        this.digitalMedia.storageId = data.storageId;
        this.digitalMedia.userId = data.userId;
        this.collapsible.addDigitalMediaCollapsible(this.digitalMedia); 
      },
      (error) => console.log(error)
    );
  }

  loadImages() {
    this.newImage = new Image;
    this.images = [];
    this.serverService.getImages(this.userId, this.caseId, this.deviceId, this.digitalMediaId).subscribe(
      (response) => {
        const data = response.json(); 
        let tempImage:Image;
        for (let obj of data.images_list) {
          tempImage = new Image(); 
          tempImage.id = obj.id;
          tempImage.backupStorageMediaId = obj.backupStorageMediaId;
          tempImage.backupStorageMediaName = obj.backupStorageMediaName;
          tempImage.dmId = obj.dmId;
          tempImage.format = obj.format;
          tempImage.imagingTools = obj.imagingTools;
          tempImage.mediaId = obj.mediaId;
          tempImage.notes = obj.notes;
          tempImage.postCollection = obj.postCollection;
          tempImage.primaryStorageMediaId = obj.primaryStorageMediaId;
          tempImage.primaryStorageMediaName = obj.primaryStorageMediaName;
          tempImage.size = obj.size;
          tempImage.userId = obj.userId;
          this.images.push(tempImage);    
        }
      },
      (error) => console.log(error)
    )

  }


  postImage() {
    this.savedChanges = true;
    this.serverService.postImage(this.userId, this.caseId, this.deviceId, this.digitalMediaId, this.newImage).subscribe(
      (response)=> this.loadImages(),
      (error)=> this.toastService.show('ERROR: Images not added', 4000)
    )
  }
}
