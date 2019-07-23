import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeadowComponent } from './meadow.component';

describe('MeadowComponent', () => {
  let component: MeadowComponent;
  let fixture: ComponentFixture<MeadowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeadowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeadowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
