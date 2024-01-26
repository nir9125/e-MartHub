import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  saveAddress: FormGroup;
  userDetails: any;
  addressList: Array<any>=[];
  showAddressForm: boolean = false;
  @Output() submitClicked: EventEmitter<void> = new EventEmitter<void>();


  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog){
    this.saveAddress = this.formBuilder.group({
      doorNo:['', Validators.required],
      streetName:['', Validators.required],
      cityName:['', Validators.required],
      pinCode:['', Validators.required],
      emailId:['', Validators.required]
      
    })

      let mailId = localStorage.getItem('mail');
      console.log(mailId);
      this.authService.getUserDetails(mailId).subscribe(resp => {
        console.log(resp);
        this.userDetails = resp;
        console.log(this.userDetails)
        localStorage.setItem('name', this.userDetails.firstName);
        localStorage.setItem('email', this.userDetails.mailId);
        localStorage.setItem('mobile', this.userDetails.mobileNo);
       
       
      })


      this.authService.getAddressDetails(mailId).subscribe(resp => {
        console.log(resp);
        this.addressList = resp;
      }, err => {
        console.log('Hello'+ err)
      })
    

  }
  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;

    // Reset the form when hiding the address form
    if (!this.showAddressForm) {
      this.saveAddress.reset();
    }
  }


  registerAddress(saveAddress: FormGroup){
    console.log(saveAddress.value);
    this.authService.addAddress(this.saveAddress.value).subscribe(resp => {
      this.saveAddress.reset();
      this.router.navigate(['/userProfile']);

    })
  }

  deleteAddress(address: any): void {
    const index = this.addressList.indexOf(address);
    if (index !== -1) {
      this.addressList.splice(index, 1);
    }
  }
  addAddress() {
    location.reload();
  }

  showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }

  selectClick():void{
    this.showAlert('Your delivery address selected');
    this.submitClicked.emit();

  }

  deleteClick():void{
    this.showAlert('Address deleted successfully');
    this.submitClicked.emit();


  }


}
