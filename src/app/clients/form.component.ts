import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

    // ngFor binds data to this var
    public client: Client = new Client();
    public title: String = 'Create client';
    public errors: string[] = [];

    constructor(
        private clientService: ClientService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.loadClient();
    }

    loadClient(): void{
        this.activatedRoute.params.subscribe(params => {
            let id = params['id'];
            if (id) {
                this.clientService.getClient(id).subscribe( client => this.client = client)
            }
        })
    }

    update():void {
        this.clientService.update(this.client).subscribe( 
            response => {
                this.router.navigate(['/clients']);
                console.log(this.client);
                swal.fire('Updated client', `Client ${response.data.name} updated successfully`, 'success');
            },
            err => {
                this.errors = err.error.errors as string[]
                console.error('Status code from backend: ' + err.status);
                console.error(err.error.errors);
            }
        )
    }

    create(): void {
        this.clientService.create(this.client).subscribe(
            response => {
                this.router.navigate(['/clients']);
                swal.fire('New Client', `Client ${response.name} created successfully`, 'success');
            },
            err => {
                this.errors = err.error.errors as string[]
                console.error('Status code from backend: ' + err.status);
                console.error(err.error.errors);
            }
        )
    }
}
