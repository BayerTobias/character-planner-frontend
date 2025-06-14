import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, LoginComponent, SignUpComponent],
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

  // variables for background image rotation
  transition: boolean = false;
  index: number = 0;
  currentImg: string = this.backgroundImages[0];
  nextImg: string = this.backgroundImages[1];

  activeContainer: string | null = null;
  containerAnimation: boolean = false;
  slideDirection: string = '';
  hideNav: boolean = false;

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

  openLoginOrSignup(key: string) {
    this.containerAnimation = true;
    this.slideDirection = key === 'login' ? 'right' : 'left';

    setTimeout(() => {
      this.activeContainer = key;
      this.hideNav = true;
      this.containerAnimation = false;
    }, 1000);
  }

  slideInNav() {
    this.activeContainer = null;
    this.hideNav = false;
    this.slideDirection = '';
  }
}
