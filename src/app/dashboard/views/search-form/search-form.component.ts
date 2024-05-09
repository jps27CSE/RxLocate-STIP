import { Component, EventEmitter, Output } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [LottieComponent, ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
  @Output() formSubmit: EventEmitter<{ location: string; medicine: string }> =
    new EventEmitter();
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.searchForm = this.fb.group({
      location: ['', [Validators.required]],
      medicine: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;
      this.formSubmit.emit(formData);
    } else {
      this.toastr.error('Please fill in all fields');
    }
  }

  options: AnimationOptions = {
    path: './assets/animation/search.json',
  };

  animationCreated(animationItem: AnimationItem): void {}

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '70%',
    margin: '0 auto',
  };
  protected readonly onsubmit = onsubmit;
}
