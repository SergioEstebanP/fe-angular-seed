import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    public clients: Client[] | undefined;

    constructor(private clientService: ClientService) { }

    ngOnInit(): void {
        this.clientService.getClients().subscribe(
            clients => this.clients = clients
        );
    }

    delete(client: Client): void {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: `You are going to delete ${client.name} ${client.surname}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.clientService.delete(client.id).subscribe(
                    response => {
                        this.clients = this.clients!.filter(cli => cli !== client)
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your client has been deleted.',
                            'success'
                        )
                    }
                )
            }
        })
    }
}
