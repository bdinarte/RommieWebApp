import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InfoGeneralComponent } from './info-general/info-general.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { ChatComponent } from './chat/chat.component';
import { ModalAvisoComponent } from './modal-aviso/modal-aviso.component';
import { ModalNuevoEventoComponent } from './cronograma/modal-nuevo-evento/modal-nuevo-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoGeneralComponent,
    CronogramaComponent,
    ChatComponent,
    ModalAvisoComponent,
    ModalNuevoEventoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Rommie'),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
