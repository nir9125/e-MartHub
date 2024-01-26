import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../model/role';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalizedString } from '@angular/compiler';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
    saveForm: FormGroup;
  roles = Object.values(Role);

//different validations implemented for all the input fileds
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.saveForm = this.formBuilder.group({
      firstName:['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern("[a-zA-Z][a-zA-Z]+")])],
      lastName:['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern("[a-zA-Z][a-zA-Z]+")])],
      mailId:['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z][a-zA-Z]+')]],
      password:['', Validators.required],
      mobileNo:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}")]],
      role:[null, Validators.required]
    })
  }


//This method is used for registering and also directs to the login page
  registerUser(saveForm: FormGroup){
    console.log(this.saveForm.value);
    this.authService.registerUser(this.saveForm.value).subscribe(resp => {
      this.saveForm.reset();
      this.router.navigate(['/login']);
    })
  }

}
