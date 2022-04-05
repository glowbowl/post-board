import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBoardComponent } from './components/main-board/main-board.component';
import { PublicRoutingModule } from './public-routing.module';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { PostApiService } from './services/post-api.service';

@NgModule({
  declarations: [
    MainBoardComponent,
    ArticleDetailsComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
    PostApiService
  ]
})
export class PublicModule { }
