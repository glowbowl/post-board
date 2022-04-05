import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import posts from '../services/posts.json';
import categories from '../services/categories.json';
import { IArticles, ICategories } from '../interfaces/api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  private articles: Observable<IArticles[]> | undefined;
  private categories: Observable<ICategories[]> | undefined;

  getArticles(): Observable<IArticles[]> {
    if (!this.articles) {
      this.articles = from(this.delayForPosts(2000));
    }
    return this.articles;
  }

  getCategories(): Observable<ICategories[]> {
    if (!this.categories) {
      this.categories = from(this.delayForCategories(1000));
    }
    return this.categories;
  }

  private delayForPosts(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    }).then(() => {
      return posts;
    });
  }

  private delayForCategories(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    }).then(() => {
      return categories;
    });
  }
}
