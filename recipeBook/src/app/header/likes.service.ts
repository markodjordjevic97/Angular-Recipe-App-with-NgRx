import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class likesService {

  private likes: number[] = [];

  setLikes(like: number) {
    this.likes.length = like;
  }

  getLikes(){
    return this.likes.slice();
  }
  addLikes(like: number){
    this.likes.push(like);
  }
}
