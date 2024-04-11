import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'}) // this an altenative to providing this service in providers of app.module
export class UserService {
    // activateEmitter = new EventEmitter<boolean>();
    activateEmitter = new Subject<boolean>();        
}