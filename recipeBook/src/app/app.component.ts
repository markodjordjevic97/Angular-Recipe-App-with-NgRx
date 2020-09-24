import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NotificationService} from '@progress/kendo-angular-notification';
import {MessageService} from './shared/message.service';
import {authService} from './auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{

  message: any[] = [];
  subscription: Subscription;
  private hideAfter = 2000;
  constructor(private messageService: MessageService,
              private notification: NotificationService,
              private auth: authService,
              private store: Store<fromApp.AppState>) {
  }
  ngOnInit(): void {
    this.subscription = this.messageService.getMessage().subscribe(messageGet => {
        if (messageGet) {
          this.notification.show({
            content: messageGet.message,
            animation: {type: 'slide', duration: 400},
            position: {horizontal: 'center', vertical: 'top'},
            type: {style: 'success', icon: true},
            hideAfter: this.hideAfter
          });
        }
        else {
          this.message = [];
        }
    });
    this.store.dispatch(new AuthActions.AutoLogin());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
