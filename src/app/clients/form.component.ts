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
                swal.fire('Updated client', `Client ${response.name} updated successfully`, 'success');
            }
        )
    }

    public create(): void {
        this.clientService.create(this.client).subscribe(
            response => {
                this.router.navigate(['/clients']);
                swal.fire('New Client', `Client ${response.name} created successfully`, 'success');
            }
        )
    }

}
