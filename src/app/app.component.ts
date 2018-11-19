import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('camera') camera: ElementRef<import('aframe').Entity<import('three').Camera>>;
  numberOfPresents = 20;
  presents = [];
  houses = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  cameraXPosition = 0;
  presentDropDuration = 1000;
  score = 0;
  presentCount = 1;

  ngOnInit() {
    this.camera.nativeElement.setAttribute('wasd-controls-enabled', 'false');
    this.camera.nativeElement.setAttribute('look-controls-enabled', 'false');

    // Create presents
    for (let i = 1; i - 1 < this.numberOfPresents; i++) {
      this.presents.push(i);
    }

    // Move camera 60 fps on x-axis
    setInterval(() => {
      this.cameraXPosition = this.cameraXPosition + 0.02;
      this.camera.nativeElement.object3D.position.set(this.cameraXPosition, 0, 0);
    }, 1000 / 60);

    // Drop present
    window.addEventListener('click', () => {
      console.log('Start - ', this.cameraXPosition);

      const present = document.getElementById(`present-element-id-${this.presentCount}`) as any;
      if (present) {
        present.setAttribute('position', `${this.cameraXPosition} 0 -4`);
        present.setAttribute('animation', `property: position; dir: alternate; dur: ${this.presentDropDuration}; easing: easeInSine; to: ${this.cameraXPosition} -4 -3`);

        this.presentCount++;

        // Calculate points
        const presentDropComplete = setTimeout(() => {
          present.setAttribute('position', `-10 -10 -2`);
          this.score += 100;

          console.log('End - ', this.cameraXPosition);

          clearTimeout(presentDropComplete);
        }, this.presentDropDuration + 50);
      } else {
        console.log(`Present ${this.presentCount} not found`);
      }
    });
  }
}
