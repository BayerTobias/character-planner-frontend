import { Component, inject } from '@angular/core';
import { CharacterDataService } from '../../../shared/services/character-data.service';
import { ActivatedRoute } from '@angular/router';
import { Mage } from '../../models/mage-character.model';
import { StatBoxComponent } from '../../../shared/components/character-components/stat-box/stat-box.component';
import { SkillsDisplayComponent } from '../../../shared/components/character-components/skills-display/skills-display.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { OverlayBaseComponent } from '../overlay-base/overlay-base.component';
import { SkilledNode } from '../../models/skilled-node.model';
import { GameDataService } from '../../../shared/services/game-data.service';
import { CustomWeapon } from '../../models/custom-weapon.model';
import { BaseArmor } from '../../models/base-armor.model';
import { CommonModule } from '@angular/common';
import { BaseWeapon } from '../../models/base-weapon.model';
import { ArmorSelectorComponent } from '../item-management/armor-selector/armor-selector.component';
import { ClassTranslatePipe } from '../../../shared/pipes/class-translate.pipe';

@Component({
  selector: 'app-character-overview',
  standalone: true,
  imports: [
    StatBoxComponent,
    SkillsDisplayComponent,
    CharacterDetailsComponent,
    OverlayBaseComponent,
    CommonModule,
    ArmorSelectorComponent,
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

  public selectedCustomWeapon: CustomWeapon | null = null;

  // auslagern Weapon Inventory komponente
  public selectBaseWeaponOpen: boolean = false;
  public selectedBaseWeapons: BaseWeapon[] = [];

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

  // auslagern Weapon Inventory komponente

  toggleSelectBaseWeapon() {
    this.selectBaseWeaponOpen = !this.selectBaseWeaponOpen;
  }

  selectBaseWeapon(baseWeapon: BaseWeapon) {
    const index = this.selectedBaseWeapons.findIndex(
      (weapon) => weapon.id === baseWeapon.id
    );

    if (index === -1) {
      this.selectedBaseWeapons.push(baseWeapon);
      console.log(index);
    } else {
      this.selectedBaseWeapons.splice(index, 1);
    }

    console.log(this.selectedBaseWeapons);
  }

  async saveSelectedWeapons() {
    const character = this.characterDataService.character;

    if (!character) return;

    character.baseWeapons = this.selectedBaseWeapons;

    try {
      const resp = await this.characterDataService.uploadCharacter(character);
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  }

  openCreateNewWeapon() {
    this.selectedCustomWeapon = null;
    this.overlay = true;
  }
}
