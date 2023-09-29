import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeader {
  constructor(private router: Router, private location:Location ) { }
  shouldHideRedirectors(): boolean {
    return this.router.url.endsWith('/files');
  }
  shouldShowTableListButton(): boolean {
    return this.router.url.includes('tables/');
  }

  backToFileListe() {
    this.router.navigate(['/files']);
  }
  backToTablelist() {
    this.location.back();
  }
}
