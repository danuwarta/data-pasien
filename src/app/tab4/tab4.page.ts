import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-providers'

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

interface Pasien {
  nama: string;
  nik: string;
  alamat: string; 
  noHp: string;
  dokteryangbertugas: string;
  jenislayanan: string;
  ruangRawat: string;

}

@Component({
 selector: 'app-tab4',
 templateUrl: './tab4.page.html',
 styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
 pengajuan: any = [];
 limit: number = 10;
 start: number = 0;
 constructor(
 private router: Router,
 private postPvdr: PostProvider,
 public toastController: ToastController,
 ) { }
 ngOnInit() {
 }
 ionViewWillEnter() {
 this.pengajuan = [];
 this.start = 0;
 this.loadpasien    ();
 }
 doRefresh(event: any) {
 setTimeout(() => {
 this.ionViewWillEnter();
 event.target.complete();
 }, 500);
 }
 loadData(event: any) {
 this.start += this.limit;
 setTimeout(() => {
 this.loadpasien().then(() => {
 event.target.complete();
 });
 }, 500);
 }
 loadpasien() {
  return new Promise(resolve => {
  let body = {
  aksi: 'getdata',
  limit : this.limit,
  start : this.start,
  };
  this.postPvdr.postData(body, 'action.php').subscribe(data => {
  for (let pasien of data.result) {
  this.pengajuan.push(pasien);
  }
  resolve(true);
  });
  });
  }
} 
