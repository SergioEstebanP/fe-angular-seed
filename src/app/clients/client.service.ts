import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { CLIENTS } from './clients.json';
import { Client } from './client';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { ClientsComponent } from './clients.component';

@Injectable({
    providedIn: 'root'
})

export class ClientService {

    private urlEndpoint: string = 'http://localhost:8080/api/clients';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    // inject the dependency and also create and initialize the variable http
    constructor(private http: HttpClient, private router: Router) { }

    // OLD one returning static data
    // getClients(): Observable<Client[]> {
    // return of(CLIENTS);
    // }

    // Best fit, using mapping functions for data conversion
    getClients(page: number): Observable<any> {
        return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
            tap((response: any) => {
                (response.content as Client[]).forEach(client => {
                    // we can send it to kibana here for example
                    console.log(client.name);
                })
            }),
            map((response: any) => {
                (response.content as Client[]).map(client => {
                    client.name = client.name?.toUpperCase();
                    // let datePipe = new DatePipe('en-US');
                    // client.createdAt = datePipe.transform(client.createdAt, 'dd-MM-yyyy') 
                    client.createdAt = formatDate(client.createdAt!, 'dd-MM-yyyy', 'en-US');
                    return client;
                });
                return response;
            })
        );
    }

    getClient(id: any): Observable<Client> {
        return this.http.get<Client>(`${this.urlEndpoint}/${id}`).pipe(
            catchError(e => {
                this.router.navigate(['/clients'])
                console.error(e.error.message);
                Swal.fire('Error editting client', e.error.message, 'error');
                return throwError(e);
            })
        );
    }

    create(client: Client): Observable<Client> {
        return this.http.post(this.urlEndpoint, client, { headers: this.httpHeaders }).pipe(
            map((response: any) => response.data as Client),
            catchError(e => {
                if (e.status == 400) {
                    return throwError(e);
                }
                console.error(e.error.message);
                Swal.fire('Error creating client', e.error.message, 'error');
                return throwError(e);
            })
        );
    }

    update(client: Client): Observable<any> {
        return this.http.put<any>(`${this.urlEndpoint}/${client.id}`, client, { headers: this.httpHeaders }).pipe(
            catchError(e => {
                if (e.status == 400) {
                    return throwError(e);
                }
                console.error(e.error.message);
                Swal.fire('Error editing the client', e.error.message, 'error');
                return throwError(e);
            })
        );
    }

    delete(id: number): Observable<Client> {
        return this.http.delete<Client>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders }).pipe(
            catchError(e => {
                console.error(e.error.message);
                Swal.fire('Error deleting the client', e.error.message, 'error');
                return throwError(e);
            })
        );
    }
}
