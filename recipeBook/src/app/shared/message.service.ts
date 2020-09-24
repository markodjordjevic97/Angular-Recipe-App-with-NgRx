import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  public shareMessage = new Subject<any>()

  sendMessage(message: string) {
    this.shareMessage.next({message: message});
  }

  getMessage(): Observable<any> {
    return this.shareMessage.asObservable();
  }
}
