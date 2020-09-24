import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Observable} from 'rxjs';
import {firebaseService} from '../shared/firebase.service';
import {MessageService} from '../shared/message.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as shoppingListActions from './store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private firebase: firebaseService,
              private messageService: MessageService,
              private store: Store<fromApp.AppState>){}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }

  onSave() {
    this.messageService.sendMessage('Your ingredients are successfully saved!');
  }


}
