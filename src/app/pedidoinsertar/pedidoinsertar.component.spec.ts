import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoinsertarComponent } from './pedidoinsertar.component';

describe('PedidoinsertarComponent', () => {
  let component: PedidoinsertarComponent;
  let fixture: ComponentFixture<PedidoinsertarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoinsertarComponent]
    });
    fixture = TestBed.createComponent(PedidoinsertarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
