import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculaFolhaComponent } from './calcula-folha.component';

describe('CalculaFolhaComponent', () => {
  let component: CalculaFolhaComponent;
  let fixture: ComponentFixture<CalculaFolhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculaFolhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculaFolhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
