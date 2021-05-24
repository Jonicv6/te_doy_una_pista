import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ReservePage } from './reserve.page';

describe('ReservePage', () => {
  let component: ReservePage;
  let fixture: ComponentFixture<ReservePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReservePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
