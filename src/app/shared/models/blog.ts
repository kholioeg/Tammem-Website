import { DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BlogsService } from './../services/blogs.service';

export class Blog{
  blog_category_id: string;
  content: string;
  date_time: Date;
  id: string;
  image_url: string;
  is_confirmed: boolean;
  is_tamm: boolean;
  title: string;
  user_full_name: string;
  user_id: string;
  user_phone: string;
  blog: BlogsService;

  constructor(blog: Blog){
    this.blog_category_id = blog.blog_category_id;
    this.content = blog.content;
    this.date_time = blog.date_time;
    this.id = blog.id;
    this.image_url = blog.image_url;
    this.is_confirmed = blog.is_confirmed;
    this.is_tamm = blog.is_tamm;
    this.title = blog.title;
    this.user_full_name = blog.user_full_name;
    this.user_id = blog.user_id;
    this.user_phone = blog.user_phone;
  }

  addBlog(): void{
  }

  getAllBlogs(): Observable<QuerySnapshot<DocumentData>>{
    return this.blog.getAllBlogs();
  }

  getFilteredBlogs(): any{
  }
}

