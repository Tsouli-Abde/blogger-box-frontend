import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService, Category } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
})
export class AddPostComponent implements OnInit {
  categories: Category[] = [];

  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    categoryId: ['', Validators.required],
    content: ['', [Validators.required, Validators.maxLength(2500)]]
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  get title() {
    return this.postForm.get('title');
  }

  get category() {
    return this.postForm.get('categoryId');
  }

  get content() {
    return this.postForm.get('content');
  }

  onSubmit() {
    if (this.postForm.invalid) {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'Please review your post',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    const formValue = this.postForm.value;
    this.postService.create({
      title: formValue.title!,
      content: formValue.content!,
      categoryId: formValue.categoryId!
    }).subscribe(() => {
      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Post submitted successfully',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        this.router.navigate(['/']);
      });
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
