import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private storeSub: Subscription;

  constructor( private store: Store<fromApp.AppState>) { }

  authentification: FormGroup;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  isPassword = true;

  ngOnInit(): void {
    this.authentification = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,
        Validators.minLength(6), Validators.maxLength(20)])
    });
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authentification.valid) {
      return;
    }
    const email = this.authentification.value.email;
    const password = this.authentification.value.password;

    this.isLoading = true;

    if (this.isLoginMode){
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    }
    else {
      this.store.dispatch(new AuthActions.SignupStart({email:email, password: password}));
    }
    this.authentification.reset();
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
