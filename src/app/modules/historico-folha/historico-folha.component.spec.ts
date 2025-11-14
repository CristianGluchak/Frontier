import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFolhaComponent } from './historico-folha.component';

describe('HistoricoFolhaComponent', () => {
  let component: HistoricoFolhaComponent;
  let fixture: ComponentFixture<HistoricoFolhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoFolhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoFolhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
