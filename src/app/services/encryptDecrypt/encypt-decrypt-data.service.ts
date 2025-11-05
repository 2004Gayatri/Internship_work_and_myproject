import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncyptDecryptDataService {

  constructor() { }
  encryptSecretKey:any="thz!@#123"
  encryptData(data: any){
    // try {
    //   const encryptedData = CryptoJS.AES.encrypt(data, this.encryptSecretKey).toString();
    //   return encryptedData;
    // } catch (error) {
    //   console.error('Encryption error:', error);
    //   return undefined;
    // }
  }
  // Decrypt data using CryptoJS AES decryption
  decryptData(encryptedData: any){
    // try {
    //   const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptSecretKey);
    //   const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    //   return decryptedData;
    // } catch (error) {
    //   console.error('Decryption error:', error);
    //   return undefined;
    // }
  }
}
