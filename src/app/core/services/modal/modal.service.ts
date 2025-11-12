import { inject, Injectable, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { SubscribeConfig } from './types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private ngbModal = inject(NgbModal);

  private modalRef?: NgbModalRef;
  private modalSubject$ = new BehaviorSubject<SubscribeConfig>({ isOpen: false });

  open<T>(type: string, modalContent: TemplateRef<T>, options?: NgbModalOptions) {
    this.close();

    this.modalRef = this.ngbModal.open(modalContent, options);

    this.modalRef.closed.subscribe(() => this.modalSubject$.next({ isOpen: false }));
    this.modalRef.dismissed.subscribe(() => this.modalSubject$.next({ isOpen: false }));
    this.modalSubject$.next({ isOpen: true, type });
  }

  close() {
    if (this?.modalRef) {
      this.modalRef.close();
      this.modalRef = undefined;
      this.modalSubject$.next({ isOpen: false });
    }
  }

  get modalState$() {
    return this.modalSubject$.asObservable();
  }
}
