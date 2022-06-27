import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

@Component({
  selector: 'app-horizontal-navbar',
  templateUrl: './horizontal-navbar.component.html',
  styleUrls: ['./horizontal-navbar.component.scss'],
})
export class HorizontalNavbarComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  constructor() { }

  ngOnInit() {
  }

}
