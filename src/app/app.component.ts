import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerOverlayComponent } from './components/shared/spinner-overlay/spinner-overlay.component';
import { SpinnerService } from './services/spinner.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SpinnerOverlayComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'solyomsoft-task';

  constructor(public spinnerService: SpinnerService, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.spinnerService.isLoading.subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
