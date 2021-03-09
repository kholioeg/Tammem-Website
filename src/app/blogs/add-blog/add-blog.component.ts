import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  direction = localStorage.getItem('direction');
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

  onSubmit(form): void{}
}
