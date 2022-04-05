import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostApiService } from '../../services/post-api.service';
import { first } from 'rxjs/operators';
import { IArticles, ICategories } from '../../interfaces/api.interfaces';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  public article: IArticles | undefined;
  public categories: ICategories[] = [];

  constructor(
      private route: ActivatedRoute,
      private api: PostApiService,
      private location: Location
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const articleIdFromRoute = Number(routeParams.get('articleId'));

    this.api.getArticles().pipe(first()).subscribe( (result: IArticles[]) => {
      this.article = result.find((article: any) => article.id === articleIdFromRoute);
    });

    this.api.getCategories().pipe(first()).subscribe( (result: ICategories[]) => {
      this.categories = result.slice();
    });
    
  }

  getBack(): void {
    this.location.back();
  }

}
