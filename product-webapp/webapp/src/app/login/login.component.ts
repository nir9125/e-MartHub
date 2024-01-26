import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  userRole: string = ' ';
  

  //performing validations for login form
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private routeService: RouteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      mailId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //for getting the user role
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userRole = params['role'];
    });
  }


  //authenticating the user after login and directing the user based on role
  loginUser(loginForm: FormGroup) {
    console.log(this.loginForm.value);
    const role = this.loginForm.value;
    this.authService.authenticateUser(this.loginForm.value).subscribe(
      (resp) => {
        console.log(this.loginForm.value.mailId);
        localStorage.setItem('smail', this.loginForm.value.mailId);
        this.authService.getUserRole(this.loginForm.value.mailId).subscribe(
          data => {
            console.log(data);
            localStorage.setItem('r', data);
            const r = data;
            if(data === 'Customer'){
              this.router.navigate(['/customerDashboard']);
              localStorage.setItem('mail', this.loginForm.value.mailId);
              this.authService.getUserDetails(this.loginForm.value.mailId).subscribe(
                details => {
                  console.log(details.firstName);
                }
              )
            }
            else{
              this.router.navigate(['/sellerDashboard']);
              // this.router.navigate(['/productsOfSeller'])
            }
           }//,err => {
          //   alert('Role not found');
          // }
        )
        sessionStorage.setItem('bearerToken', resp['token']);
        console.log(resp['token']);
        
      },
      (err) => {
        alert('Invalid Credentials');
      }
    );
  }


}
