import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-overlay',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner-overlay.component.html',
  styleUrl: './spinner-overlay.component.scss'
})
export class SpinnerOverlayComponent {

}
