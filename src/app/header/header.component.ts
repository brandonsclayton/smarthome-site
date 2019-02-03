import { Component, OnInit } from '@angular/core';
import { Header } from './header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerMenu: Header[] = [
    {
      display: 'Example',
      routerLink: '/',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
