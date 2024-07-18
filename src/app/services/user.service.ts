import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL_JWT, BASE_URL_WP, ORDERS_URL} from './nav.service';
import {scrollToTop} from '../utils';
import {Router} from '@angular/router';
import Timeout = NodeJS.Timeout;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  KEY_WISH = 'wishList';
  KEY_CART = 'cartList';
  KEY_USER_TOKEN = 'userToken';
  KEY_USER_ID = 'userId';
  KEY_USER_NAME = 'userName';
  KEY_USER_EMAIL = 'userEmail';
  KEY_USER_PHONE = 'userPhone';
  KEY_USER_ROLE = 'userRole';

  wishIds: number[];
  cartIds: number[];
  private topNavCallback: (lists: CWCounts) => void;
  private enquiryCallback: (cart: number[]) => void;
  toastMessage: string;
  toastMessageTimeout: Timeout;
  userId: string;
  userToken: string;
  userDisplayName: string;
  userEmail: string;
  userPhone?: string;
  userIsArtist: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.checkLogin();
  }

  /**
   * Refreshes the products in cart and liked lists. If the user is not logged in, it fetches the lists from localStorage.
   * If user is logged in, it fetches the lists from remote. If forceMerge is true, it fetches lists from remote and from localStorage,
   * then merges them.
   * @param forceMerge If true, merge the local and remote lists.
   */
  refreshCartWish(forceMerge: boolean): Promise<null> {
    return new Promise((resolve, reject) => {
      let cartList: number[];
      let wishList: number[];

      if (!this.userToken || forceMerge) {
        let temp = localStorage.getItem(this.KEY_WISH);
        wishList = this.filterNonNumbers(JSON.parse(temp));
        temp = localStorage.getItem(this.KEY_CART);
        cartList = this.filterNonNumbers(JSON.parse(temp));
      }

      if (this.userToken) {
        this.getCartWishRemote()
          .then(res => {
            if (forceMerge) {
              this.mergeRemoteLocalLists(res.cart, res.wish, cartList, wishList, resolve, reject);
            } else {
              this.mergeRemoteLocalLists(res.cart, res.wish, [], [], resolve, reject);
            }
          })
          .catch(error => {
            reject(error);
          });
      } else {
        this.cartIds = cartList;
        this.wishIds = wishList;
        if (this.topNavCallback) {
          this.topNavCallback({cartCount: cartList.length, wishCount: cartList.length});
        }
        if (this.enquiryCallback) {
          this.enquiryCallback(cartList);
        }
        resolve();
      }

    });
  }

  getCartWishRemote(): Promise<{ cart: number[], wish: number[] }> {
    return new Promise((resolve, reject) => {
      this.http.get(`${BASE_URL_WP}/users/${this.userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.userToken}`
        }
      })
        .subscribe((res: any) => {
          resolve({cart: this.filterNonNumbers(res.meta.cart), wish: this.filterNonNumbers(res.meta.wish)});
        }, reject);
    });
  }

  private filterNonNumbers(array: any): number[] {
    return Array.isArray(array) ? array.filter(item => !!Number(item)) : [];
  }

  private mergeRemoteLocalLists(remoteCart: number[], remoteWish: number[], localCart: number[], localWish: number[],
                                resolve: (status: null) => void, reject: any) {
    localCart = [...remoteCart, ...localCart];
    localCart = localCart.filter((item, index) => localCart.indexOf(item) === index);
    localWish = [...remoteWish, ...localWish];
    localWish = localWish.filter((item, index) => localWish.indexOf(item) === index);
    // Removing items in wish that are already in cart
    localWish = localWish.filter(item => localCart.indexOf(item) === -1);
    this.updateRemoteNotifyChanges(resolve, reject, localCart, localWish);
  }

  private isInList(id: number, list: number[]): boolean {
    return list ? list.findIndex(item => item === id) >= 0 : false;
  }

  addToCart(id: number): Promise<CWStatus> {
    return new Promise((resolve, reject) => {
      if (!this.isInList(id, this.cartIds)) {
        const cartList = this.cartIds.slice();  // Do not modify state before confirmation from the server
        cartList.push(id);
        const wishList = this.wishIds.filter(item => item !== id);  // Removing item from the other list
        this.updateRemoteNotifyChanges(resolve, reject, cartList, wishList, id);
      }
    });
  }

  addToWish(id: number): Promise<CWStatus> {
    return new Promise((resolve, reject) => {
      if (!this.isInList(id, this.wishIds)) {
        const wishList = this.wishIds.slice();  // Do not modify state before confirmation from the server
        wishList.push(id);
        const cartList = this.cartIds.filter(item => item !== id);  // Removing item from the other list
        this.updateRemoteNotifyChanges(resolve, reject, cartList, wishList, id);
      }
    });
  }

  removeFromCart(id: number): Promise<CWStatus> {
    return new Promise((resolve, reject) => {
      const newIds = this.cartIds.filter(item => item !== id);
      if (newIds.length !== this.cartIds.length) {
        // Items were removed
        this.updateRemoteNotifyChanges(resolve, reject, newIds, this.wishIds, id);
      }
    });
  }

  removeFromWish(id: number): Promise<CWStatus> {
    return new Promise((resolve, reject) => {
      const newIds = this.wishIds.filter(item => item !== id);
      if (newIds.length !== this.wishIds.length) {
        // Items were removed
        this.updateRemoteNotifyChanges(resolve, reject, this.cartIds, newIds, id);
      }
    });
  }

  setTopNavCallback(callback: (lists: CWCounts) => void) {
    this.topNavCallback = callback;
    if (this.cartIds && this.wishIds) {
      this.topNavCallback({cartCount: this.cartIds.length, wishCount: this.wishIds.length});
    }
  }

  setEnquiryCallback(callback: (cart: number[]) => void) {
    this.enquiryCallback = callback;
    if (this.cartIds) {
      this.enquiryCallback(this.cartIds);
    }
  }

  removeEnquiryCallback() {
    this.enquiryCallback = null;
  }

  private updateRemoteNotifyChanges(resolve: (status: (CWStatus)) => void, reject: (err: Error) => void, cartIds: number[],
                                    wishIds: number[], id?: number) {

    if (this.userToken) {
      this.http.post(`${BASE_URL_WP}/users/${this.userId}`, {
        meta: {cart: cartIds, wish: wishIds}
      }, {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
          'Content-Type': 'application/json'
        }
      }).subscribe((res: any) => {
        if (res.meta.cart && res.meta.wish) {
          this.updateLocalNotifyChanges(resolve, res.meta.cart, res.meta.wish, id);
        } else {
          if (this.topNavCallback) {
            this.topNavCallback({cartCount: 0, wishCount: 0});
          }
          if (this.enquiryCallback) {
            this.enquiryCallback([]);
          }
          reject(new Error('Failed to update cart'));
        }
      }, err => {
        if (this.topNavCallback) {
          this.topNavCallback({cartCount: 0, wishCount: 0});
        }
        if (this.enquiryCallback) {
          this.enquiryCallback([]);
        }
        reject(new Error('Failed to update cart'));
      });
    } else {
      this.updateLocalNotifyChanges(resolve, cartIds, wishIds, id);
    }
  }

  private updateLocalNotifyChanges(resolve: (status: CWStatus) => void, cartIds: number[],
                                   wishIds: number[], id?: number) {
    // No need for local storage if the user is logged in.
    if (this.userToken) {
      localStorage.removeItem(this.KEY_CART);
      localStorage.removeItem(this.KEY_WISH);
    } else {
      localStorage.setItem(this.KEY_CART, JSON.stringify(cartIds));
      localStorage.setItem(this.KEY_WISH, JSON.stringify(wishIds));
    }

    if (id) {
      resolve({isCart: this.isInList(id, cartIds), isWish: this.isInList(id, wishIds)});
    } else {
      resolve(null);
    }
    if (this.topNavCallback) {
      this.topNavCallback({cartCount: cartIds.length, wishCount: wishIds.length});
    }
    if (this.enquiryCallback) {
      this.enquiryCallback(cartIds);
    }
    this.cartIds = cartIds;
    this.wishIds = wishIds;
  }

  showToastMessage(message: string) {
    if (this.toastMessageTimeout) {
      clearTimeout(this.toastMessageTimeout);
    }
    this.toastMessage = message;
    this.toastMessageTimeout = setTimeout(() => this.toastMessage = null, 3000);
  }

  private checkLogin() {
    const token = localStorage.getItem(this.KEY_USER_TOKEN);
    if (token) {
      this.http.post(`${BASE_URL_JWT}/token/validate`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .subscribe(() => {
          this.userToken = token;
          this.userId = localStorage.getItem(this.KEY_USER_ID);
          this.userDisplayName = localStorage.getItem(this.KEY_USER_NAME);
          this.userEmail = localStorage.getItem(this.KEY_USER_EMAIL);
          this.userPhone = localStorage.getItem(this.KEY_USER_PHONE);
          this.userIsArtist = localStorage.getItem(this.KEY_USER_ROLE) === 'artist';
          this.refreshCartWish(false).catch(() => this.showToastMessage('Failed to fetch products in cart and liked list'));
        }, err => {
          if (err.status >= 400 && err.status <= 499) {  // As codes other than the 4xx might be temporary
            this.setUserData(null, null, null, null, null, null);
          }
          this.refreshCartWish(false).catch(() => this.showToastMessage('Failed to fetch products in cart and liked list'));
        });
    } else {
      this.refreshCartWish(false).catch(() => this.showToastMessage('Failed to fetch products in cart and liked list'));
    }
  }

  login(email: string, password: string, phone?: string, name?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.userToken) {
        reject({status: 401, statusText: 'You are already logged in. Clear browser data if this is a mistake.'});
        return;
      }

      this.http.post(`${BASE_URL_JWT}/token`, {
        username: email,
        password
      }, {headers: {'Content-Type': 'application/json'}})
        .subscribe((res: any) => {
          if (phone) {
            this.setUserData(res.token, res.user_id, name || res.user_email, res.user_email, phone, res.user_role[0]);
            this.refreshCartWish(true).catch(() => this.showToastMessage('Failed to fetch products in cart and liked list'));
            this.setUserPhoneName(phone, name);
            resolve(this.userDisplayName);
          } else {

            this.getUserPhone(res.user_id, res.token)
              .then(phoneNumber => {
                this.setUserData(res.token, res.user_id, res.user_display_name || res.user_email, res.user_email, phoneNumber,res.user_role[0]);
                this.refreshCartWish(true).catch(() => this.showToastMessage('Failed to fetch products in cart and liked list'));
                resolve(this.userDisplayName);
              })
              .catch(() => {
                this.setUserData(null, null, null, null, null, null);
                this.refreshCartWish(false).catch(() => this.showToastMessage('Failed to fetch products in cart and liked list'));
                reject(new Error('Failed to fetch phone number'));
              });
          }
        }, err => {
          this.setUserData(null, null, null, null, null, null);
          this.refreshCartWish(false).catch(() => this.showToastMessage('Failed to fetch products in cart and liked list'));
          reject(err);
        });
    });
  }

  logout() {
    this.setUserData(null, null, null, null, null, null);
    this.refreshCartWish(false).catch(() => this.showToastMessage('Failed to fetch products in cart and liked list'));
    this.showToastMessage('You have been logged out');
  }

  private setUserPhoneName(phone: string, name: string) {
    if (this.userToken) {
      this.http.post(`${BASE_URL_WP}/users/${this.userId}`, {
        name, meta: {phone}
      }, {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
          'Content-Type': 'application/json'
        }
      }).subscribe(() => {
        // No idea what to do if this fails. User is registered, logged in, but we can't set a phone number. What then?
      });
    }
  }

  private getUserPhone(userId: string, userToken: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(`${BASE_URL_WP}/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      })
        .subscribe((res: any) => {
          resolve(res.meta.phone ? res.meta.phone[0]?.length ? res.meta.phone[0] : null : null);
        }, reject);
    });
  }

  register(email: string, name: string, phone: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.userToken) {
        reject({status: 401, statusText: 'You are already logged in. Clear browser data if this is a mistake.'});
        return;
      }

      this.http.post(`${BASE_URL_WP}/users/register`, {
          email, username: email, password
        }, {headers: {'Content-Type': 'application/json'}}
      ).subscribe(() => {
        this.login(email, password, phone, name)
          .then(resolve)
          .catch(reject);
      }, err => {
        this.setUserData(null, null, null, null, null, null);
        reject(err);
      });
    });
  }

  forgotPass(email: string): Promise<null> {
    return new Promise((resolve, reject) => {
      if (this.userToken) {
        reject({status: 401, statusText: 'You are logged in. Clear browser data if this is a mistake.'});
        return;
      }

      this.setUserData(null, null, null, null, null,null);
      this.http.post(`${BASE_URL_WP}/users/lostpassword`, {user_login: email},
        {headers: {'Content-Type': 'application/json'}})
        .subscribe(() => {
          resolve();
        }, err => {
          reject(err);
        });
    });
  }

  private setUserData(token: string, id: string, name: string, email: string, phone: string, role: string = null) {
    this.userToken = token;
    this.userId = id;
    this.userDisplayName = name;
    this.userEmail = email;
    this.userPhone = phone;
    this.userIsArtist = role === 'artist';
    token ? localStorage.setItem(this.KEY_USER_TOKEN, token) : localStorage.removeItem(this.KEY_USER_TOKEN);
    id ? localStorage.setItem(this.KEY_USER_ID, id) : localStorage.removeItem(this.KEY_USER_ID);
    name ? localStorage.setItem(this.KEY_USER_NAME, name) : localStorage.removeItem(this.KEY_USER_NAME);
    email ? localStorage.setItem(this.KEY_USER_EMAIL, email) : localStorage.removeItem(this.KEY_USER_EMAIL);
    phone ? localStorage.setItem(this.KEY_USER_PHONE, phone) : localStorage.removeItem(this.KEY_USER_PHONE);
    role ? localStorage.setItem(this.KEY_USER_ROLE, role) : localStorage.removeItem(this.KEY_USER_ROLE);
  }

  getOrders(): Promise<Orders> {
    return new Promise((resolve, reject) => {
      this.http.get(`${ORDERS_URL}/ordersForUser`, {headers: {Authorization: `Bearer ${this.userToken}`}})
        .subscribe(res => resolve(res as Orders), err => reject(err));
    });
  }

  placeOrders(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(`${ORDERS_URL}/placeOrder`, {dummy: 1}, {headers: {Authorization: `Bearer ${this.userToken}`}})
        .subscribe((res: any) => {
          this.getCartWishRemote()
            .then(cw => {
              this.updateLocalNotifyChanges(() => {
              }, cw.cart, cw.wish);
            })
            .catch(err => {
              console.log('Failed to refresh cart: ', err.message);
            })
            .finally(() => {
              scrollToTop();
              resolve(res.someFailed as boolean);
            });
        }, err => reject(err));
    });
  }

  getProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${ORDERS_URL}/productsForArtist`, {headers: {Authorization: `Bearer ${this.userToken}`}})
        .subscribe(res => resolve(res as Product[]), err => reject(err));
    });
  }

  addProduct(
    name: string,
    productDescriptionEnglish: string,
    productDescriptionHindi: string,
    artist: string,
    craft: string,
    productWhatsNew: string,
    productShortDescription: string,
    regularPrice: string,
    salePrice: string,
    productCategories: any,
    fileData: File,
    galleryData: File[],
    length: string,
    height: string,
    width: string,
    weight: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      if (fileData) {
        formData.append('files[]', fileData, fileData.name);
      }
      formData.append('name', name);
      formData.append('description_english', productDescriptionEnglish);
      formData.append('description_hindi', productDescriptionHindi);
      formData.append('artist', artist);
      formData.append('craft', craft);
      formData.append('feature_in_whats_new', productWhatsNew);
      formData.append('short_description', productShortDescription);
      formData.append('categories', JSON.stringify(productCategories));
      formData.append('regular_price', regularPrice);
      formData.append('sale_price', salePrice);

      if (!isNaN(parseInt(length, 10))) {
        formData.append('length', length);
      }
      if (!isNaN(parseInt(height, 10))) {
        formData.append('height', height);
      }
      if (!isNaN(parseInt(width, 10))) {
        formData.append('width', width);
      }
      if (!isNaN(parseInt(weight, 10))) {
        formData.append('weight', weight);
      }

      for (const galleryImg of galleryData) {
        formData.append('files[]', galleryImg, galleryImg.name);
      }
      this.http.post(`${ORDERS_URL}/addArtistProduct`,
        formData, {
          headers: {
            Authorization: `Bearer ${this.userToken}`
          }
        }).subscribe((res: any) => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
}

interface CWCounts {
  cartCount: number;
  wishCount: number;
}

export interface CWStatus {
  isCart: boolean;
  isWish: boolean;
}

export interface SingleOrder {
  orderId: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Orders {
  currencySymbol: string;
  orders: SingleOrder[];
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  artistId?: number;
  image: string;
}
