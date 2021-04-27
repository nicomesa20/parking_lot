import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Observable, Subject } from 'rxjs';

const STORAGE_KEYS: string[] = ['accessToken', 'refreshToken', 'user', 'refresh']

@Injectable({
  providedIn: 'root'
})
export class observeAuthService {

  private storageSub = new Subject<boolean>();

  constructor(
    private nativeStorage: NativeStorage
  ) { }

  /**
   * This method change of status, for example true or false
   */
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable()
  }

  setItem(key: string, data: any) {
    this.nativeStorage.setItem(key, data)
    this.storageSub.next(true);
  }

  /**
   * This method get element of local storage
   * @param key is a string for example 'token', this key is the one that is going to get
   */
  getItem(key: string) {
    this.nativeStorage.getItem(key).then(
      data => { return data }
    )
  }

  /**
   * This method remove element of local storage
   * @param key is a string for example 'token', this key is the one that will be removed
   */
  removeItem(key) {
    this.nativeStorage.remove(key)
    this.storageSub.next(false);
  }

  clear() {
    STORAGE_KEYS.forEach(value => this.nativeStorage.remove(value))
    this.storageSub.next(false)
  }

}
