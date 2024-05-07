import { Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HeroService } from '../../services/hero-service.service';
import { IntHero } from '../../interfaces/hero.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
  ],
  providers: [
    HeroService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent {
  /** INJECTIONS */
  private heroService = inject(HeroService);
  private dialog = inject(MatDialog);

  /** TABLE */
  displayedColumns: string[] = ['id', 'name', 'realName', 'edit', 'delete'];

  /** DATA VARIABLES */
  searchValue = signal<string>('');
  herosList = this.heroService.getHeroes();
  // readonly herosList = computed(() => {
  //   const query = this.searchValue();
  //   if (query !== '') {
  //     return this.heroService.getHeroesByName(this.searchValue());
  //   } else {
  //     return this.heroService.getHeroes();
  //   }
  // });

  onSearchUpdated(value: string): void {
    console.log(value);
    if (value) {
      this.heroService.getHeroesByName(value);
    }
  }

  openNewHeroDialog(): void {
    const newHero: IntHero = {
      id: this.herosList()[this.herosList().length - 1].id + 1,
      name: '',
      realName: '',
    };
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: newHero,
    });

    dialogRef.afterClosed().subscribe((newHero: IntHero) => {
      if (newHero) {
        this.heroService.registerHero(newHero);
      }
    });
  }

  editHero(hero: IntHero): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: hero,
    });

    dialogRef.afterClosed().subscribe((updatedHero: IntHero) => {
      if (updatedHero) {
        this.heroService.updateHero(updatedHero);
      }
    });
  }

  deleteHero(hero: IntHero): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: hero,
    });

    dialogRef.afterClosed().subscribe((updatedHero: IntHero) => {
      if (updatedHero) {
        this.heroService.updateHero(updatedHero);
      }
    });

    this.heroService.deleteHero(hero.id);
  }
}
