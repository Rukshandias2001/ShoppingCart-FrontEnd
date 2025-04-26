import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthServiceService} from './service/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  //inject login details service
  const loginDetailService = inject(AuthServiceService)


  // Check if the access token exists in sessionStorage
  const accessToken = sessionStorage.getItem('access-token');


  // If access token is not present, navigate to /register
  if (!accessToken) {
    router.navigate(['/register']);
    return false;
  }
  let loginUserStatus = loginDetailService.getUserDetails()

  const allowedRoles = route.data["role"] as Array<string>;
  console.log(allowedRoles)
  console.log(loginUserStatus)
  if (allowedRoles && loginUserStatus) {
    if (!allowedRoles.includes(loginUserStatus.role)) {
      console.log(false)
      // User role is not allowed
      router.navigate(['/register']);

      return false;
    }
  }


  // If access token exists, allow access to the route
  return true;
};

