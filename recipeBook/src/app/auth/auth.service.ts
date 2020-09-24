import {Injectable} from "@angular/core";
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})

export class authService {

  private expTimer: any = null;

  constructor( private store: Store<fromApp.AppState>) {
  }

  setLogoutTimer(expDuration: number) {
   this.expTimer = setTimeout(() =>{
      this.store.dispatch(new AuthActions.Logout());
    },expDuration);
  }
  clearLogoutTimer() {
    if(this.expTimer) {
      clearTimeout(this.expTimer);
      this.expTimer = null;
    }
  }

}
