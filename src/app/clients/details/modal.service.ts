import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    public modal: boolean = false;
    private _uploadNotification = new EventEmitter<any>();

    constructor() { }

    get uploadNotification(): EventEmitter<any> {
        return this._uploadNotification;
    }

    openModal() {
        // console.log('Modal service OK: ' + this.modal);
        this.modal = true;
    }

    closeModal() {
        this.modal = false;
    }
}

