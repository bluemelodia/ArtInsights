import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export class Authentication implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate() {
        if (this.auth.isLoggedIn) { return true; }

        this.router.navigate(['/login']);
        return false;
    }
}