/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CommandMySuffixService } from 'app/entities/command-my-suffix/command-my-suffix.service';
import { ICommandMySuffix, CommandMySuffix } from 'app/shared/model/command-my-suffix.model';

describe('Service Tests', () => {
  describe('CommandMySuffix Service', () => {
    let injector: TestBed;
    let service: CommandMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: ICommandMySuffix;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(CommandMySuffixService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new CommandMySuffix(0, currentDate, 0, false);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            commandAt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a CommandMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            commandAt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            commandAt: currentDate
          },
          returnedFromService
        );
        service
          .create(new CommandMySuffix(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a CommandMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            commandAt: currentDate.format(DATE_TIME_FORMAT),
            quantity: 1,
            serve: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            commandAt: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of CommandMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            commandAt: currentDate.format(DATE_TIME_FORMAT),
            quantity: 1,
            serve: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            commandAt: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CommandMySuffix', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
