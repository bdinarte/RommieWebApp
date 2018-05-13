import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-aviso',
  templateUrl: './modal-aviso.component.html',
  styleUrls: ['./modal-aviso.component.css']
})
export class ModalAvisoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  display = 'none';
  private header = '¡Aviso!';
  private message = 'Vacío.';

  open_modal() {
    this.display='block';
  }

  close_modal(){
    this.display = 'none';
  }

  set_header(header: string){
    this.header = header;
  }

  set_message(message: string){
    this.message = message;
  }

}
