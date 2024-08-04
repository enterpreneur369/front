import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../model/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialModule, RouterLinkActive, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

  menus: Menu[];

  constructor(private loginService: LoginService, private menuService: MenuService,  private router: Router){

  }

  ngOnInit(): void {
      this.menuService.getMenuChange().subscribe(data => this.menus = data);
  }

  logout(){
    this.loginService.logout();
  }

  goToMyAccount() {
    this.router.navigate(['/account/myaccount']);
  }
}
