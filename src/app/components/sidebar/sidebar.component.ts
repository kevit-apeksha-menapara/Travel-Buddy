import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon?: string;
    active?: boolean;
    hasSubNav?: boolean;
    expand?: boolean;
    subNav?: any[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', active: true, hasSubNav: false},
    { path: '/item', title: 'Item',  icon:'person', active: true, hasSubNav: true, expand:false, subNav:[
      {path: '/item/place', title: 'Place',  icon:'person' ,active: true, hasSubNav: false},
      {path: '/item/hotel', title: 'Hotel',  icon:'person',active: false, hasSubNav: false},
      {path: '/item/transfer', title: 'Transfer',  icon:'person', active: false, hasSubNav: false}] 
    },
    { path: '/package', title: 'Package',  icon:'person', active: false, hasSubNav: false}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  expandableTabs = ["Item"];
  showSubMenu = false;
  childActiveTab: number;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  tabNav(tabValue, child) {
    if (child) {
      if(this.menuItems[tabValue].expand == false){
        this.showSubMenu = true;
        this.menuItems[tabValue].expand = true;

      }else{
        this.showSubMenu = false;
        this.menuItems[tabValue].expand = false;
      }
      this.childActiveTab = 0;
    }  
  }

}
