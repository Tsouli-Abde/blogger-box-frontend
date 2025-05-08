import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { provideHttpClient } from '@angular/common/http';
import { PostService } from './services/post.service';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostListComponent } from './components/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PostListComponent,
    PostListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(),
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
