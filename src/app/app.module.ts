import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router'
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RoutingModuleModule } from './routing-module/routing-module.module';
import { ShoppingListModule } from './shopping-list/shoping-list.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModuleModule,
    RouterModule,
    HttpClientModule,
    CoreModule,
    SharedModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
