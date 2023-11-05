import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteEditComponent } from './favorite-edit.component';

describe('FavoriteEditComponent', () => {
  let component: FavoriteEditComponent;
  let fixture: ComponentFixture<FavoriteEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteEditComponent]
    });
    fixture = TestBed.createComponent(FavoriteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
