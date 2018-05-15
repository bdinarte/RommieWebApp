import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevoEventoComponent } from './modal-nuevo-evento.component';

describe('ModalNuevoEventoComponent', () => {
  let component: ModalNuevoEventoComponent;
  let fixture: ComponentFixture<ModalNuevoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNuevoEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNuevoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
