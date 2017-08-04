import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class ServerService {
  url = 'http://129.65.100.50:5000';
  // url = 'http://ec2-34-212-218-147.us-west-2.compute.amazonaws.com:80';
  constructor(private http: Http) { }

  getUsers(email: string) {
    return this.http.get(this.url + '/evd/user?email=' + email); 
  }

  postUser(json: any) {
    return this.http.post(this.url + '/evd/user', json);
  }

  getCase(userId: any, caseId) {
    return this.http.get(this.url + '/evd/' + userId + '/case?caseId=' + caseId); 
  }
  
  getCases(userId: any) {
    return this.http.get(this.url + '/evd/' + userId + '/case'); 
  }

  postCase(userId: any, json: any) {
    return this.http.post(this.url + '/evd/' + userId+ '/case', json);
  }

  getDevice(userId: any, caseId:any, deviceId: any) {
    return this.http.get(this.url + '/evd/' + userId + '/case/' + caseId + '/dev?deviceId=' + deviceId); 
  }

  getDevices(userId: any, caseId:any) {
    return this.http.get(this.url + '/evd/' + userId + '/case/' + caseId + '/dev');
  }

  postDevice(userId: any, caseId: any, json: any) {
    return this.http.post(this.url + '/evd/' + userId + '/case/' + caseId + '/dev', json);
  }

  getDigitalMedia(userId: any, caseId: any, deviceId: any, dmId: any) {
    return this.http.get(this.url + '/evd/' + userId + '/case/' + caseId + '/dev/' + deviceId + '/dm?dmId=' + dmId); 
  }

  getDigitalMedias(userId: any, caseId: any, deviceId: any) {
    return this.http.get(this.url + '/evd/' + userId + '/case/' + caseId + '/dev/' + deviceId + '/dm'); 
  }

  postDigitalMedia(userId: any, caseId: any, deviceId: any, json: any) {
    return this.http.post(this.url + '/evd/' + userId + '/case/' + caseId + '/dev/' + deviceId + '/dm', json);
  }

  getImage(userId: any, caseId: any, deviceId: any, dmId: any, imgId: any) {
    return this.http.get(this.url + '/evd/' + userId + '/case/' + caseId + '/dev/' + deviceId + '/dm/' + dmId + '/img?imgId=' + imgId );
  }

  getImages(userId: any, caseId: any, deviceId: any, dmId: any) {
    return this.http.get(this.url + '/evd/' + userId + '/case/' + caseId + '/dev/' + deviceId + '/dm/' + dmId + '/img');
  }

  postImage(userId: any, caseId: any, deviceId: any, dmId: any, json: any) {
    return this.http.post(this.url + '/evd/' + userId + '/case/' + caseId + '/dev/' + deviceId + '/dm/' + dmId + '/img', json);
  }


  // TODO GET IT
  getFile(userId: any, caseId: any, deviceId: any, dmId: any, imgId: any, fileId: any) {
    return this.http.get(this.url + '/evd/' + userId + '/case/' + caseId + '/dev/' + deviceId + '/dm/' + dmId + '/img/' + imgId + '/file?fileId=' + fileId); 
  }

  getFiles(userId: any, caseId: any, deviceId: any, dmId: any, imgId: any) {
    return this.http.get(this.url + '/evd/' + userId + '/case/' + caseId + '/dev/' + deviceId + '/dm/' + dmId + '/img/' + imgId + '/file');
  }

  postFile(userId: any, caseId: any, deviceId: any, dmId: any, imgId: any, formData: any, options: any) {
    return this.http.post(this.url + '/evd/' + userId + '/case/' + caseId + '/dev/' + deviceId + '/dm/' + dmId + '/img/' + imgId + '/file', formData, options);
  }

  getFileMDs(userId: any, caseId: any, deviceId: any, dmId: any, imgId: any) {
    return this.http.get(this.url + '/evd/' + userId + '/case/' + caseId + '/dev/' + deviceId + '/dm/' + dmId + '/img/' + imgId + '/filemd');
  }

  NUKE() {
    return this.http.delete(this.url+'/evd/nuke'); 
  }

  storeServer(servers: any[]) {
    return this.http.post(this.url + '/form',
      JSON.parse(JSON.stringify({"deviceDesc": "JACKSON",
        "imageName": "PLEASE",
        "primaryStorageMediaId": 123,
        "backupStorageMediaId": 123
      })));
  }

  getServers() {
    return this.http.get(this.url + '/form')
  }
}
