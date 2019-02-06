import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle='Products';
  navbarOpen: boolean;
  showNav: boolean;

  constructor() { 
    this.navbarOpen = false;
    this.showNav = false;
  }

  ngOnInit() {
    if(window.screen.width > 768) {
      this.navbarOpen = false;
      this.showNav = false;
    }
    if(this.navbarOpen === true && this.showNav === true && window.screen.width > 768)
    {
      this.navbarOpen = false;
      this.showNav = false;
    }
  }

  toggleCollapse() {
    this.navbarOpen = !this.navbarOpen;
    this.showNav = !this.showNav;
  }
}
