import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule,Router, NavigationStart} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,  
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule 
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent { 
  constructor(private router: Router) {
    // Detect when the user navigates to "/logout"
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url === "/logout") {
        this.logout();
      }
    });
  }

  logout(): void {
    console.log('🔴 Logout function triggered');

    // Remove token & clear session
    localStorage.removeItem('token');
    sessionStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    console.log('🟢 User logged out. Redirecting...');
    
    setTimeout(() => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }, 100);
  }
}