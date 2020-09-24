import {Action} from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] LOGIN';
export const AUTHENTICATE_FAIL = '[Auth] LOGIN_FAIL';
export const LOGOUT = '[Auth] LOGOUT';

export const AUTO_LOGIN = '[Auth] AUTO_LOGIN'
export const SIGNUP_START = '[Auth] SIGNUP_START'


export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: {email:string, userId:string,token: string, expirationDate: Date}) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}
export class LoginStart implements Action{
  readonly type = LOGIN_START;

  constructor(public payload: {email: string, password: string}) {
  }

}
export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {
  }
}
export class SignupStart implements Action{
  readonly type = SIGNUP_START;
  constructor(public payload: {email:string, password: string}) {
  }
}
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}
//unique type
export type AuthActions =
  AuthenticateSuccess |
  Logout |
  LoginStart |
  AuthenticateFail |
  SignupStart |
  AutoLogin;
