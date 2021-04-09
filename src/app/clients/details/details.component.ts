import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
    selector: 'client-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
    public client: Client = new Client();
    public title: String = 'Client Profile';
    public selectedImage: File | undefined;
    public progressBar: number = 0;

    constructor(
        private router: Router,
        private clientService: ClientService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            let id = params.get('id') as unknown as number;
            if (id) {
                this.clientService.getClient(id).subscribe(client => {
                    this.client = client;
                })
            }
        });
    }

    selectImage(event: any) {
        this.progressBar = 0;
        this.selectedImage = event.target.files[0];
        console.log(this.selectedImage);
        if (this.selectedImage!.type.indexOf('image') < 0) {
            swal.fire('Error selecting the image', 'The image should be of type image', 'error');
        } 
    }

    uploadImage() {
        if (!this.selectedImage) {
            swal.fire('Error upload', `You have to select an image`, 'success');
        } else {
            this.clientService.uploadImage(this.selectedImage!, this.client.id)
                .subscribe(event => {
                    // this.client = client;
                    if (event?.type === HttpEventType.UploadProgress) {
                        this.progressBar = Math.round((event.loaded/event.total!)*100);
                    } else if (event.type === HttpEventType.Response) {
                        let response: any = event.body;
                        this.client = response.client as Client;
                        swal.fire('Image uploaded sucessfully', response.message, 'success');
                    }
                });
        }
    }

}
