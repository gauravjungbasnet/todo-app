import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalNavbarComponent } from './horizontal-navbar.component';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatSlideToggleModule
    ],
    declarations: [
        HorizontalNavbarComponent
    ],
    exports: [HorizontalNavbarComponent]
})
export class HorizontalNavbarModule { }
