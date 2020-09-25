import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Observable, Subscription} from 'rxjs';
import {firebaseService} from '../shared/firebase.service';
import {MessageService} from '../shared/message.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as shoppingListActions from './store/shopping-list.actions';
import {map} from "rxjs/operators";
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  subscription: Subscription;
  constructor(private firebase: firebaseService,
              private messageService: MessageService,
              private store: Store<fromApp.AppState>){}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').pipe(
      map(ing => {
        return ing.ingredients;
      }))
      .subscribe(
      (ing: Ingredient[]) => {
        this.ingredients = ing;
      }
    )
  }

  onEditItem(index: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }

  onSave() {
    this.messageService.sendMessage('Your ingredients are successfully saved!');
    this.store.dispatch(new shoppingListActions.StoreIngredients());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
