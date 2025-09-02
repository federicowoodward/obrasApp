import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

function roleHome(role: string | null): string {
  if (role === 'worker') return '/worker/elements';
  // default arquitecto
  return '/';
}

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1) Autenticado
  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // 2) Validar rol (si la ruta define roles)
  const expectedRoles = route.data?.['roles'] as string[] | undefined;
  const currentRole = auth.role();

  if (expectedRoles && currentRole && !expectedRoles.includes(currentRole)) {
    // Redirigir al home del rol actual
    router.navigate([roleHome(currentRole)]);
    return false;
  }

  return true;
};
