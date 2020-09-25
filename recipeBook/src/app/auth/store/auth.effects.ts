
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../user.model";
import * as firebase from "firebase";
import Auth = firebase.auth.Auth;
import * as fromAuthActions from "./auth.actions";
import {authService} from "../auth.service";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registred?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email,userId,token,expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate});
}
const handleError = (errorRes: any) => {
  let errorMessage = 'An error occurred'
  if(!errorRes.error || !errorRes.error.error) {
  return of(new AuthActions.AuthenticateFail(errorMessage))
}
switch (errorRes.error.error.message) {
  case 'EMAIL_NOT_FOUND': {
    errorMessage = 'That email is not found'
    break;
  }
  case 'INVALID_PASSWORD': {
    errorMessage = 'That not correct password for that email.'
    break
  }
  case 'USER_DISABLED': {
    errorMessage = 'The user account has been disabled by an administrator. '
    break;
  }
  case 'EMAIL_EXISTS': {
    errorMessage = 'This email exists already.'
    break;
  }
  case 'OPERATION_NOT_ALLOWED': {
    errorMessage = 'That operation is not allowed'
    break;
  }
  case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
    errorMessage = 'Thats some unusual acitivity';
  }
  default: {
    break;
  }
}
return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {
  // SIGNUP
  @Effect()
  authSignup = this.action$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEMlDo1gifMRBbSkT9Xam165QY8t87kWw',
        {
          email: signUpAction.payload.email,
          password: signUpAction.payload.password,
          returnSecureToken: true
        }).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
        map(resData => {
         return handleAuthentication(
           +resData.expiresIn,
           resData.email,
           resData.localId,
           resData.idToken)
        }),
        catchError(errorRes => {
         return handleError(errorRes);
    })
  )}));
  // LOGIN
  @Effect()
  authLogin = this.action$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEMlDo1gifMRBbSkT9Xam165QY8t87kWw',
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(
            +resData.expiresIn,
            resData.email,
            resData.localId,
            resData.idToken)
        }),
          catchError(errorRes => {
            return handleError(errorRes);
    }),
  )}));
  // SUCCESS ROUTING
  @Effect({dispatch: false})
  authSuccess = this.action$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  autoLogin = this.action$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(()=> {
      // UZIMAMO SACUVANOG USERA IZ LOCAL STORAGE
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      }  = JSON.parse(localStorage.getItem('userData'));
      if(!userData)
        return {type: 'DUMMY'};
      // KREIRAMO USERA
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate));
      // PROVERAVAMO DA LI JE TO TAJ PREKO TOKENA !!!!
      if(loadedUser.token){
        const expDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expDuration)
        return new fromAuthActions.AuthenticateSuccess(
          {
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate)}
        );
      }
      return {type: 'DUMMY'};
    })
  )

  // Auth Logout
  @Effect({dispatch: false})
  authLogout = this.action$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })

  )

  constructor(private action$: Actions,
              private http: HttpClient,
              private router: Router,
              private authService: authService) {}
}

