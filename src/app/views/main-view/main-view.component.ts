/** Angular Core */
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/** Angular Material */
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
/** Components & Services*/
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { DeleteHeroDialogComponent } from './components/delete-hero-dialog/delete-hero-dialog.component';
import { LoadingService } from '../../core/services/loading/loading.service';

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
    MatProgressBarModule,
    CommonModule,
  ],
  providers: [
    HeroService,
    LoadingService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent implements OnInit {
  /** INJECTIONS */
  private heroService = inject(HeroService);
  private loadingService = inject(LoadingService);
  private dialog = inject(MatDialog);

  /** TABLE */
  displayedColumns: string[] = ['id', 'name', 'realName', 'edit', 'delete'];

  /** DATA VARIABLES */
  searchValue = signal<string>('');
  herosList = this.heroService.getHeroes();

  isLoading = false;

  /** INIT */
  ngOnInit(): void {
    this.loadingService.loading.subscribe(value => {
      this.isLoading = value;
    });
  }

  /** COMPONENT LOGIC */
  onSearchUpdated(value: string): void {
    if (value) {
      this.loadingService.showLoading();
      this.loadingService.simulateHttp().subscribe(() => {
        this.heroService.getHeroesByName(value);
        this.loadingService.hideLoading();
      });
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
        this.loadingService.showLoading();
        this.loadingService.simulateHttp().subscribe(() => {
          this.heroService.registerHero(newHero);
          this.loadingService.hideLoading();
        });
      }
    });
  }

  editHero(hero: IntHero): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: hero,
    });

    dialogRef.afterClosed().subscribe((updatedHero: IntHero) => {
      if (updatedHero) {
        this.loadingService.showLoading();
        this.loadingService.simulateHttp().subscribe(() => {
          this.heroService.updateHero(updatedHero);
          this.loadingService.hideLoading();
        });
      }
    });
  }

  deleteHero(hero: IntHero): void {
    const dialogRef = this.dialog.open(DeleteHeroDialogComponent, {
      data: hero,
    });

    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.loadingService.showLoading();
        this.loadingService.simulateHttp().subscribe(() => {
          this.heroService.deleteHero(hero.id);
          this.loadingService.hideLoading();
        });
      }
    });
  }
}
