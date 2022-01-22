import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { StateHookComponent } from './demo/state-hook/state-hook.component';
import { RxHookComponent } from './demo/rx-hook/rx-hook.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StateHookComponent,
    RxHookComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
