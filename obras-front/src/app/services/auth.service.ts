import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  // más campos si necesitás
}

const LS_USER = 'auth_user';
const LS_ROLE = 'auth_role';
const LS_TIMESTAMP = 'auth_time';
const MAX_SESSION_MS = 60 * 60 * 1000; // 1 hora en milisegundos

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<User | null>(null);
  role = signal<string | null>(null);

  constructor() {
    // Al iniciar, chequea localStorage y expira si es necesario
    const userStr = localStorage.getItem(LS_USER);
    const role = localStorage.getItem(LS_ROLE);
    const time = localStorage.getItem(LS_TIMESTAMP);

    if (userStr && role && time) {
      const elapsed = Date.now() - Number(time);
      if (elapsed < MAX_SESSION_MS) {
        this.user.set(JSON.parse(userStr));
        this.role.set(role);
      } else {
        this.logout(); // Expirado
      }
    }
  }

  setAuth(user: User, role: string) {
    this.user.set(user);
    this.role.set(role);
    localStorage.setItem(LS_USER, JSON.stringify(user));
    localStorage.setItem(LS_ROLE, role);
    localStorage.setItem(LS_TIMESTAMP, String(Date.now()));
  }

  logout() {
    this.user.set(null);
    this.role.set(null);
    localStorage.removeItem(LS_USER);
    localStorage.removeItem(LS_ROLE);
    localStorage.removeItem(LS_TIMESTAMP);
  }

  isAuthenticated() {
    return !!this.user();
  }
}
