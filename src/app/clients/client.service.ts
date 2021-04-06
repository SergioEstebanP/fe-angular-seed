import { Injectable } from '@angular/core';
import { CLIENTS } from './clients.json';
import { Client } from './client';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ClientService {

    private urlEndpoint:string = 'http://localhost:8080/api/clients';
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    // inject the dependency and also create and initialize the variable http
    constructor(private http: HttpClient) { }

    // OLD one returning static data
    // getClients(): Observable<Client[]> {
        // return of(CLIENTS);
    // }

    // Best fit, using mapping functions for data conversion
    getClients(): Observable<Client[]> {
        return this.http.get(this.urlEndpoint).pipe(
            map(response => response as Client[])
        );
    }

    getClient(id: any): Observable<Client> {
        return this.http.get<Client>(`${this.urlEndpoint}/${id}`);
    }

    create(client: Client): Observable<Client> {
        return this.http.post(this.urlEndpoint, client, {headers: this.httpHeaders}).pipe(
            map(response => response as Client)
        );
    }

    update(client: Client): Observable<Client> {
        return this.http.put<Client>(`${this.urlEndpoint}/${client.id}`, client, {headers: this.httpHeaders});
    }

    delete(id: number): Observable<Client> {
        return this.http.delete<Client>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders});
    }
}
