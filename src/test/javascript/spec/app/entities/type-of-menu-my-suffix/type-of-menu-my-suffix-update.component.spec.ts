/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RestaurantTestModule } from '../../../test.module';
import { TypeOfMenuMySuffixUpdateComponent } from 'app/entities/type-of-menu-my-suffix/type-of-menu-my-suffix-update.component';
import { TypeOfMenuMySuffixService } from 'app/entities/type-of-menu-my-suffix/type-of-menu-my-suffix.service';
import { TypeOfMenuMySuffix } from 'app/shared/model/type-of-menu-my-suffix.model';

describe('Component Tests', () => {
  describe('TypeOfMenuMySuffix Management Update Component', () => {
    let comp: TypeOfMenuMySuffixUpdateComponent;
    let fixture: ComponentFixture<TypeOfMenuMySuffixUpdateComponent>;
    let service: TypeOfMenuMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestaurantTestModule],
        declarations: [TypeOfMenuMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TypeOfMenuMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeOfMenuMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeOfMenuMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TypeOfMenuMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TypeOfMenuMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
