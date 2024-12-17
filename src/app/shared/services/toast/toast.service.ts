import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ToastType = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _showToast = new BehaviorSubject<boolean>(false);
  private _toastMessage = new BehaviorSubject<string>('');
  private _toastType = new BehaviorSubject<ToastType>('success');

  showToast$: Observable<boolean> = this._showToast.asObservable();
  toastMessage$: Observable<string> = this._toastMessage.asObservable();
  toastType$: Observable<ToastType> = this._toastType.asObservable();

  constructor() {}

  showSuccess(message: string) {
    this._toastMessage.next(message);
    this._toastType.next('success');
    this._showToast.next(true);

    setTimeout(() => this.hideToast(), 3000);
  }

  showError(message: string) {
    this._toastMessage.next(message);
    this._toastType.next('error');
    this._showToast.next(true);

    setTimeout(() => this.hideToast(), 3000);
  }

  hideToast() {
    this._showToast.next(false);
  }
}
