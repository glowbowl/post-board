import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { MainBoardComponent } from './components/main-board/main-board.component';

const routes: Routes = [
  {
    path: '',
    component: MainBoardComponent,
    pathMatch: 'full'
  },
  { path: ':articleId',
    component: ArticleDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }