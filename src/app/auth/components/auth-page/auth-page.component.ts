import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  backgroundImages: string[] = [
    '/assets/img/auth-background-img/background-1.png',
    '/assets/img/auth-background-img/background-2.png',
    '/assets/img/auth-background-img/background-3.png',
    '/assets/img/auth-background-img/background-4.png',
    '/assets/img/auth-background-img/background-5.png',
    '/assets/img/auth-background-img/background-6.png',
    '/assets/img/auth-background-img/background-7.png',
    '/assets/img/auth-background-img/background-8.png',
    '/assets/img/auth-background-img/background-9.png',
    '/assets/img/auth-background-img/background-10.png',
    '/assets/img/auth-background-img/background-11.png',
    '/assets/img/auth-background-img/background-12.png',
  ];

  transition: boolean = false;
  index: number = 0;
  currentImg: string = this.backgroundImages[0];
  nextImg: string = this.backgroundImages[1];

  ngAfterViewInit() {
    setInterval(() => {
      this.slideToNextImage();
    }, 5000);
  }

  slideToNextImage(): void {
    this.transition = true;

    const nextIndex = (this.index + 1) % this.backgroundImages.length;
    this.nextImg = this.backgroundImages[nextIndex];

    setTimeout(() => {
      this.index = nextIndex;
      this.currentImg = this.backgroundImages[this.index];
      this.transition = false;
    }, 1000);
  }
}
