import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from './customer-my-suffix.service';

@Component({
  selector: 'jhi-customer-my-suffix-delete-dialog',
  templateUrl: './customer-my-suffix-delete-dialog.component.html'
})
export class CustomerMySuffixDeleteDialogComponent {
  customer: ICustomerMySuffix;

  constructor(
    protected customerService: CustomerMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.customerService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'customerListModification',
        content: 'Deleted an customer'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-customer-my-suffix-delete-popup',
  template: ''
})
export class CustomerMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customer }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CustomerMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.customer = customer;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/customer-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/customer-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
