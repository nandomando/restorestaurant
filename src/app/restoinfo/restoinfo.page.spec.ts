import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestoinfoPage } from './restoinfo.page';

describe('RestoinfoPage', () => {
  let component: RestoinfoPage;
  let fixture: ComponentFixture<RestoinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestoinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
