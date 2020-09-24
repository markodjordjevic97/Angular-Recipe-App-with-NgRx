import { Component, OnInit } from '@angular/core';
import {GalleryService} from './gallery.service'
@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss']
})
export class HeroPageComponent implements OnInit {

  constructor(public gallery: GalleryService) { }
  ngOnInit(): void {
  }

}
