import { Component, OnInit, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HeroService } from '../../services/hero-service.service';
import { IntHero } from '../../interfaces/hero.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  ],
  providers: [HeroService],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent implements OnInit {
  private heroService = inject(HeroService);
  private dialog = inject(MatDialog);

  searchValue = signal<string>('');
  displayedColumns: string[] = ['id', 'name', 'realName', 'edit', 'delete'];
  readonly herosList = this.heroService.getHeroes();

  ngOnInit(): void {
    // this.herosList.set(this.heroService.getHeroes());
  }

  openNewHeroDialog(): void {
    const newHero: IntHero = {
      id: this.herosList()[this.herosList().length - 1]?.id + 1,
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
    console.log(hero);
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: hero,
    });

    dialogRef.afterClosed().subscribe((updatedHero: IntHero) => {
      if (updatedHero) {
        console.log(updatedHero);
        this.heroService.updateHero(updatedHero);
      }
    });
  }

  deleteHero(hero: IntHero): void {
    console.log(hero);
    this.heroService.deleteHero(hero.id);
  }
}
