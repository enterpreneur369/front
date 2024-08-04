import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { LoginService } from '../../services/login.service';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../model/menu';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.development';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-layout-account',
  standalone: true,
  imports: [MaterialModule, RouterLinkActive, RouterOutlet, RouterLink, UpperCasePipe],
  templateUrl: './layout-account.component.html',
  styleUrl: './layout-account.component.css'
})
export class LayoutAccountComponent {
  menus: Menu[];
  username: string;
  roles = "user";

  constructor(private loginService: LoginService, private menuService: MenuService,  private router: Router) {   }
  ngOnInit(): void {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token);

    this.username = decodedToken.sub;
    this.roles = decodedToken.role;
    this.menuService.getMenuChange().subscribe(data => this.menus = data);
  }
  logout(){
    this.loginService.logout();
  }

  goToMain() {
    this.router.navigate(['/']);
  }
}
