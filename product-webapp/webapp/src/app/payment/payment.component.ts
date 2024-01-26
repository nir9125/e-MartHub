import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from './payment.service';
import { Router } from '@angular/router';


declare var Razorpay: any;

@Component({
  selector: 'app-root',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  title = 'demo';

  form: any = {}; 
  constructor(private http: HttpClient,
    private orderService:PaymentService, private router: Router) {
      let name = localStorage.getItem('name');
      let email = localStorage.getItem('smail');
      let mobile = localStorage.getItem('mobile');
      let tPrice = localStorage.getItem('tPrice')
      console.log(name);
      console.log(email);
      console.log(mobile);
      console.log(tPrice);
      console.log(this.form);
      this.form.amount=tPrice;
      this.form.name=name;
      this.form.email=email;
      this.form.phone=mobile;
      console.log(this.form);


  }

  

  sayHello() {
    alert("Hello DK");
  }

  paymentId: string | undefined;
  error: string | undefined;

  
  options = {
    "key": "",
    "amount": "", 
    "name": "e-martHub",
    "description": "ECommerse",
    "image": "src\assets\images\e-martHub-logos_transparent.png",
    "order_id":"",
    "handler": function (response: any){
      var event = new CustomEvent("payment.success", 
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );	  
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };
  ngOnInit() {
    this.paymentId = ''; 
      this.error = ''; 
      this.orderService.createOrder(this.form).subscribe(
      data => {
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = "e-martHub";
        this.options.prefill.email = "emarthub@gmail.com";
        this.options.prefill.contact = "9876543210";
        
        if(data.pgName ==='razor2') {
          this.options.image="";
          var rzp1 = new Razorpay(this.options);
          rzp1.open();
        } else {
          var rzp2 = new Razorpay(this.options);
          rzp2.open();
        }
       
                
        rzp1.on('payment.failed',  (response: { error: { code: any; description: any; source: any; step: any; reason: any; metadata: { order_id: any; payment_id: any; }; }; }) =>{    
          // Todo - store this information in the server
          console.log(response);
          console.log(response.error.code);    
          console.log(response.error.description);    
          console.log(response.error.source);    
          console.log(response.error.step);    
          console.log(response.error.reason);    
          console.log(response.error.metadata.order_id);    
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        }
        );
      }
      ,
      err => {
        this.error = err.error.message;
      }
      );

  }
    onSubmit(): void {
      // this.paymentId = ''; 
      // this.error = ''; 
      // this.orderService.createOrder(this.form).subscribe(
      // data => {
      //   this.options.key = data.secretId;
      //   this.options.order_id = data.razorpayOrderId;
      //   this.options.amount = data.applicationFee; //paise
      //   this.options.prefill.name = "eKartHub";
      //   this.options.prefill.email = "eKartHub@gmail.com";
      //   this.options.prefill.contact = "9876543210";
        
      //   if(data.pgName ==='razor2') {
      //     this.options.image="";
      //     var rzp1 = new Razorpay(this.options);
      //     rzp1.open();
      //   } else {
      //     var rzp2 = new Razorpay(this.options);
      //     rzp2.open();
      //   }
       
                
      //   rzp1.on('payment.failed',  (response: { error: { code: any; description: any; source: any; step: any; reason: any; metadata: { order_id: any; payment_id: any; }; }; }) =>{    
      //     // Todo - store this information in the server
      //     console.log(response);
      //     console.log(response.error.code);    
      //     console.log(response.error.description);    
      //     console.log(response.error.source);    
      //     console.log(response.error.step);    
      //     console.log(response.error.reason);    
      //     console.log(response.error.metadata.order_id);    
      //     console.log(response.error.metadata.payment_id);
      //     this.error = response.error.reason;
      //   }
      //   );
      // }
      // ,
      // err => {
      //   this.error = err.error.message;
      // }
      // );
    }

    @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event: { detail: any; }): void {
       console.log(event.detail);
       this.router.navigate(['/orderHistory']);
    }
}
