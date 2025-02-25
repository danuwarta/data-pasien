import { Component } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  nama: string = '';
  nik: string = '';
  alamat: string = '';
  noHp: string = '';
  dokteryangbertugas: string = '';
  jenislayanan: string = '';
  ruangRawat: string = '';
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
    private postPvdr: PostProvider,
    private router: Router
  ) {}

  async closeModal() {
    const modal = await this.modalCtrl.getTop();
    if (modal) {
      modal.dismiss();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  async addRegister() {
    if (this.isLoading) return;
  
    if (!this.nama || !this.nik || !this.alamat || !this.noHp || !this.dokteryangbertugas || !this.jenislayanan || !this.ruangRawat) {
      return this.presentToast('Harap lengkapi semua field');
    }
  
    this.isLoading = true;
  
    const body = {
      aksi: 'addregister',
      nama: this.nama,
      nik: this.nik,
      alamat: this.alamat,
      noHp: this.noHp,
      dokteryangbertugas: this.dokteryangbertugas,
      jenislayanan: this.jenislayanan,
      ruangRawat: this.ruangRawat
    };
  
    try {
      this.postPvdr.postData(body, 'action.php').subscribe({
        next: async (response: any) => {
          this.isLoading = false;
          if (response && response.success) {
            await this.presentToast('Registrasi berhasil!');
            this.resetForm();
            this.router.navigate(['/tabs/tab4']);
          } else {
            await this.presentToast(response?.msg || 'Terjadi kesalahan pada server');
          }
        },
        error: async (error) => {
          console.error('Error:', error);
          this.isLoading = false;
          await this.presentToast('Koneksi gagal');
        }
      });
    } catch (e) {
      console.error('Exception:', e);
      this.isLoading = false;
      await this.presentToast('Terjadi kesalahan sistem');
    }
  }

  resetForm() {
    this.nama = '';
    this.nik = '';
    this.alamat = '';
    this.noHp = '';
    this.dokteryangbertugas = '';
    this.jenislayanan = '';
    this.ruangRawat = '';
  }
}