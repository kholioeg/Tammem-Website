import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BlogsService } from './../shared/services/blogs.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Blog } from '../shared/models/blog';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {
  direction = localStorage.getItem('direction');
  subscription: Subscription;
  blogs: Blog[];
  page = 1;

  constructor(private blogsService: BlogsService, public router: Router) { }

  ngOnInit(): void {
    this.subscription = this.blogsService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  handlePageChange(event): void{
    this.page = event;
  }
}
