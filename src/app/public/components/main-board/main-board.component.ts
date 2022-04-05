import { Component, OnInit } from '@angular/core';
import { PostApiService } from '../../services/post-api.service';
import { first } from 'rxjs/operators';
import { IArticles, ICategories } from '../../interfaces/api.interfaces';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit {
  public selectedCategorie: number = 0;
  public selectedSort: number = 0;
  public selectedSortByDate: number = 0;

  public categories: ICategories[] = [];

  public posts: IArticles[] = [];
  public filteredPosts: IArticles[] = [];

  constructor(private api: PostApiService) { }
  
  ngOnInit(): void {
    this.api.getArticles().pipe(first()).subscribe( (result: IArticles[]) => {
      this.posts = result.slice();
      this.filteredPosts = result.slice();
    });

    this.api.getCategories().pipe(first()).subscribe( (result: ICategories[]) => {
      this.categories = result.slice();
    });
  }

  public selectCategory(id: number): void {
    if (id) {
      this.filteredPosts = this.posts.filter((item:any) => item.category === id);
    } else {
      this.filteredPosts = [...this.posts];
      this.selectedSortByDate = 0;
      this.selectedSort = 0;
    }
  }

  public sortArticles(prop: number, typeOfSort?: string): void {
    this.selectedCategorie ? this.sortBySelected(true, typeOfSort) : this.sortBySelected(false, typeOfSort);
    
    if (prop < 0) {
      this.filteredPosts.reverse();
    } else if (!prop && !this.selectedCategorie) {
      this.filteredPosts = [...this.posts];
    }
  }

  private sortBySelected(isCategorySelected: boolean, typeOfSort?: string): void {
    if (typeOfSort === "name") {
      this.selectedSortByDate = 0;
      this.filteredPosts = (isCategorySelected? this.filteredPosts : this.posts).sort(this.sortFunctionByNames);
    } else if (typeOfSort === "date") {
      this.selectedSort = 0;
      this.filteredPosts = (isCategorySelected? this.filteredPosts : this.posts).sort(this.sortFunctionByCreated);
    }
  }

  private sortFunctionByNames(a: IArticles, b: IArticles): number {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  }

  private sortFunctionByCreated(a: IArticles, b: IArticles): number {
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    return 0;
  }

}
