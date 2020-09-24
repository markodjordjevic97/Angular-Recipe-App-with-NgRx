import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {likesService} from '../header/likes.service';
@Injectable({
  providedIn: 'root'
})

export class firebaseService {

  constructor(private http: HttpClient,
              private likes: likesService,) {
  }

  postLikes() {
    const counter = this.likes.getLikes().length;
    this.http.put('https://recipebook-2020.firebaseio.com/likes.json', counter).subscribe();
  }

  fetchLikes(){
    return this.http.get<number>('https://recipebook-2020.firebaseio.com/likes.json')
                    .pipe(tap(num => {
                      this.likes.setLikes(num);
                    }));

  }
}
