import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
    selector: 'client-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
    @Input() public client: Client | undefined;
    public title: String = 'Client Profile';
    public selectedImage: File | undefined;
    public progressBar: number = 0;

    constructor(
        private clientService: ClientService,
        public modalService: ModalService
    ) { }

    ngOnInit(): void { }

    selectImage(event: any) {
        this.progressBar = 0;
        this.selectedImage = event.target.files[0];
        // console.log(this.selectedImage);
        if (this.selectedImage!.type.indexOf('image') < 0) {
            swal.fire('Error selecting the image', 'The image should be of type image', 'error');
        } 
    }

    uploadImage() {
        if (!this.selectedImage) {
            swal.fire('Error upload', `You have to select an image`, 'success');
        } else {
            this.clientService.uploadImage(this.selectedImage!, this.client!.id)
                .subscribe(event => {
                    // this.client = client;
                    if (event?.type === HttpEventType.UploadProgress) {
                        this.progressBar = Math.round((event.loaded/event.total!)*100);
                    } else if (event.type === HttpEventType.Response) {
                        let response: any = event.body;
                        this.client = response.client as Client;
                        this.modalService.uploadNotification.emit(this.client);
                        swal.fire('Image uploaded sucessfully', response.message, 'success');
                    }
                });
        }
    }

    closeModal() {
        this.modalService.closeModal();
        // this.selectedImage = null;
        this.progressBar = 0;
    }

}
