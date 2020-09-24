import {Component, OnDestroy, OnInit} from '@angular/core';
import {likesService} from "./likes.service";
import {firebaseService} from "../shared/firebase.service";
import {Subscription} from "rxjs";
import {Store} from '@ngrx/store';

import {map} from "rxjs/operators";
import {Router} from "@angular/router";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  counter: number = 0;
  clicked: boolean = false;
  buttonClass: string = 'burger-btn';

  isAuth =  false;
  constructor(private firebase: firebaseService,
              private likeService: likesService,
              private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit(): void {
      this.firebase.fetchLikes().subscribe(num => {
        this.counter = num;
      })

    this.subscription = this.store.select('auth').pipe(
      map(authState => {
        return authState.user
      })
      ).subscribe(user => {
      this.isAuth = !!user;
    })
  }
  pageLikes() {
    this.clicked = true;
    if(this.counter === null) {
      this.counter = 0;
    }
    else{
      this.counter++;
    }
    this.likeService.addLikes(this.counter);
    this.firebase.postLikes();
  }

  SignInOut() {
    if(this.isAuth){
    this.store.dispatch(new AuthActions.Logout());
    }
    else {
      this.router.navigate(['/auth']);
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

