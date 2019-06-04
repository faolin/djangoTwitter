import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ViewChild,
  ElementRef,
  Pipe,
  PipeTransform
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { AppConstants } from '../../models/app-constants';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe2' })
export class SafePipe2 implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  user: User = null;
  token: string = null;
  roles: string[] = null;
  subscriptions: any[] = null;

  @ViewChild('the_iframe') iframe: ElementRef;
  public urlLoginIframe = environment.urlLoginIframe;

  constructor(
    private router: Router,
    private userService: UserService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private appConstants: AppConstants
  ) {}

  ngOnInit(): void {
    // Capture the session ID if available
    this.route.params.subscribe(params => {
      const logout = params['logout'];
      if (logout !== undefined && logout === 'true') {
        console.error('log out request .....');
        this.userService.removeUser();
        this.urlLoginIframe = environment.urlLogoutIframe;
      }
    });

    const global = this.renderer.listen('window', 'message', evt => {
      // console.log('Clicking the document', evt);
      if (evt.data[0] !== 'authentication') {
        return;
      }

      const data = JSON.parse(evt.data[1]);

      if (typeof window.localStorage !== 'undefined') {
        // Code for localStorage/sessionStorage.
        /*localStorage.setItem('authentication.token', data[this.appConstants.TOKEN]);
        localStorage.setItem(
          'authentication.roles',
          JSON.stringify(data[this.appConstants.ROLES])
        );
        localStorage.setItem(
          'authentication.user',
          JSON.stringify(data[this.appConstants.USER])
        );*/
        this.loginSuccessful(data);
      } else {
        // Sorry! No Web Storage support..
        console.error('Sorry! No Web Storage support..', Storage);
      }
    });
  }

  public ngAfterViewInit(): void {
    document.getElementById('preloader').style['display'] = 'none';
  }

  loginSuccessful(data: any): void {
    console.log(data);
    if (data[this.appConstants.USER]) {
      this.user = data[this.appConstants.USER];
    }

    if (data[this.appConstants.TOKEN]) {
      this.token = data[this.appConstants.TOKEN];
    }

    if (data[this.appConstants.ROLES]) {
      this.roles = data[this.appConstants.ROLES];
    }

    if (data[this.appConstants.SUBSCRIPTIONS]) {
      this.subscriptions = data[this.appConstants.SUBSCRIPTIONS];
    }
    const save = this.userService.saveUser(this.user, this.token, this.roles, this.subscriptions);
    this.router.navigate([this.userService.getDefaultPath()]);
  }
}
