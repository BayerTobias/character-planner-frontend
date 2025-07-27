import { Component, inject } from '@angular/core';
import { CharacterDataService } from '../../../shared/services/character-data.service';
import { ActivatedRoute } from '@angular/router';
import { Mage } from '../../models/mage-character.model';
import { StatBoxComponent } from '../../../shared/components/character-components/stat-box/stat-box.component';
import { SkillsDisplayComponent } from '../../../shared/components/character-components/skills-display/skills-display.component';
import { CharacterDetailsComponent } from '../../../shared/components/character-components/character-details/character-details.component';
import { OverlayBaseComponent } from '../overlay-base/overlay-base.component';
import { SkilledNode } from '../../models/skilled-node.model';
import { GameDataService } from '../../../shared/services/game-data.service';
import { CustomWeapon } from '../../models/custom-weapon.model';
import { max } from 'rxjs';
import { BaseArmor } from '../../models/base-armor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-overview',
  standalone: true,
  imports: [
    StatBoxComponent,
    SkillsDisplayComponent,
    CharacterDetailsComponent,
    OverlayBaseComponent,
    CommonModule,
  ],
  templateUrl: './character-overview.component.html',
  styleUrl: './character-overview.component.scss',
})
export class CharacterOverviewComponent {
  public characterDataService = inject(CharacterDataService);
  public gameDataService = inject(GameDataService);
  private route = inject(ActivatedRoute);

  private characterId: number = -1;
  public overlay: boolean = false;

  public selectArmorOpen: boolean = false;

  // Auslagern in Armor Componente
  public focusedArmorIndex: number = 0;

  public selectedCustomWeapon: CustomWeapon | null = null;

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.characterId = +params['character_id'];
    });
    await this.characterDataService.getCharacterData(this.characterId);
  }

  isCaster(): boolean {
    return this.characterDataService.character instanceof Mage;
  }

  openDmgOverlay() {
    this.overlay = true;
  }

  closeOverlay() {
    this.overlay = false;
    console.log(this.characterDataService.character);
  }

  async skillDevelopMagic() {
    const character = this.characterDataService.character;

    if (character) {
      const dm = character?.class.skills.find((skill) => skill.id === 19);

      if (dm) {
        dm.nodesSkilled = 1;

        character.skilledSkills.push(
          new SkilledNode({
            id: null,
            skill: 19,
            nodes_skilled: 1,
          })
        );
      }

      await this.characterDataService.uploadCharacter(character);
    }
  }

  openEditCustomWeapon(customWeapon: CustomWeapon) {
    this.selectedCustomWeapon = customWeapon;
    this.overlay = true;

    console.log('overview', this.selectedCustomWeapon);
  }

  toggleSelectArmor() {
    this.selectArmorOpen = !this.selectArmorOpen;
  }

  // Auslagern in Armor Komponente

  async handleKeydown(event: KeyboardEvent) {
    const maxIndex = this.gameDataService.baseArmors.length - 1;

    switch (event.key) {
      case 'ArrowDown':
        if (this.focusedArmorIndex < maxIndex && this.selectArmorOpen)
          this.focusedArmorIndex++;
        else this.focusedArmorIndex = 0;
        event.preventDefault();
        console.log(this.focusedArmorIndex);
        break;

      case 'ArrowUp':
        if (this.focusedArmorIndex > 0 && this.selectArmorOpen)
          this.focusedArmorIndex--;
        else this.focusedArmorIndex = maxIndex;
        event.preventDefault();
        console.log(this.focusedArmorIndex);
        break;

      case 'Enter':
        if (this.selectArmorOpen) {
          const armor = this.gameDataService.baseArmors[this.focusedArmorIndex];
          await this.selectArmor(armor);
          event.preventDefault();
        }
        break;

      case 'Escape':
        if (this.selectArmorOpen) {
          this.selectArmorOpen = false;
          event.preventDefault();
        }
        break;
    }
  }

  // Auslagern in Armor Komponente

  async selectArmor(armor: BaseArmor) {
    const character = this.characterDataService.character;

    if (!character) {
      return;
    }

    character.armor = armor;

    try {
      const resp = await this.characterDataService.uploadCharacter(character);
      console.log(resp);
      this.selectArmorOpen = false;
    } catch (err) {
      console.error(err);
    }
  }

  openCreateNewWeapon() {
    this.selectedCustomWeapon = null;
    this.overlay = true;
  }
}
