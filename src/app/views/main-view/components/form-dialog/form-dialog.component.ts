/** Angular Core */
import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
/** Angular Material */
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
/** Interfaces & directives */
import { IntHero } from '../../../../interfaces/hero.interface';
import { UpperCaseDirective } from '../../../../core/directives/uppercase.directive';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    UpperCaseDirective,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent {
  formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    name: [this.hero.name, Validators.required],
    realName: [this.hero.realName],
  });

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public hero: IntHero
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const hero: IntHero = {
        id: this.hero.id,
        name: this.form.get('name')?.value,
        realName: this.form.get('realName')?.value,
      };

      this.dialogRef.close(hero);
    }
  }
}
