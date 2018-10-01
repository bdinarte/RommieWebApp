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
import { NoticiasComponent } from './noticias/noticias.component';
import { ModalConfirmacionComponent } from './modal-confirmacion/modal-confirmacion.component';
import { ExpositoresComponent } from './expositores/expositores.component';
import { ExpositoresService } from './expositores/expositores.service';

@NgModule({
  declarations: [
    AppComponent,
    InfoGeneralComponent,
    CronogramaComponent,
    ChatComponent,
    ModalAvisoComponent,
    ModalNuevoEventoComponent,
    NoticiasComponent,
    ModalConfirmacionComponent,
    ExpositoresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Rommie'),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [ExpositoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
