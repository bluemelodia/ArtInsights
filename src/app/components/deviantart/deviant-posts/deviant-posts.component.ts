import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-deviant-posts',
  templateUrl: './deviant-posts.component.html',
  styleUrls: ['./deviant-posts.component.scss']
})
export class DeviantPostsComponent implements OnInit {
    constructor(
      private alertService: AlertService,
      private auth: AuthService,
      private blogService: BlogService,
      private router: Router
    ) {}

    ngOnInit() {
      
    }
}
