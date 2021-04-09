import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    public clients: Client[] = [];
    public paginator: any;

    constructor(
        private clientService: ClientService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            let page: number = params.get('page') as unknown as number;
            if (!page) {
                page = 0;
            }
            this.clientService.getClients(page).pipe(
                tap(response => {
                    // console.log(response);
                    (response.content as Client[]).forEach(client => console.log("Client: " + client.name));
                })
            ).subscribe(response => {
                this.clients = response.content as Client[]
                this.paginator = response;
            });
        });
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
