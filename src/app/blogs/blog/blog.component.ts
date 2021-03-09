import { ActivatedRoute } from '@angular/router';
import { BlogsService } from './../../shared/services/blogs.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Blog } from 'src/app/shared/models/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  id: string;
  blog: Blog;
  constructor(private blogsService: BlogsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.blogsService.getBlog(this.id).pipe(first()).subscribe(blog => {
      this.blog = blog;
    });
  }

}
