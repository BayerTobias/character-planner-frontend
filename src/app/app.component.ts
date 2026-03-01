import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameDataService } from './shared/services/game-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private gameData = inject(GameDataService);

  title = 'character_planer';

  ngOnInit(): void {
    this.gameData.loadAll();
  }
}
