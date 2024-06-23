import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  constructor(private route:Router ){}
  navigateTo(path: string) {
    this.route.navigate([path]);
  }
}
