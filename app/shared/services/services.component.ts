import {Component, OnInit} from '@angular/core';
import {CoreService} from '../../core/core.service';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  public email: string;
  public code: any;
  public validEmail = false;
  public codeSended = false;

  public loading = false;

  public config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '40px'
    }
  };

  constructor(
      private core: CoreService,
      private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  checkEmailValid(): void {
    this.validEmail = this.validateEmail(this.email);
  }

  validateEmail(email): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateEmailOnBackend(): void {
    this.loading = true;
    const validate = this.core.checkemail({email: this.email}).toPromise();
    Promise.resolve(validate).then((r: any) => {
      if(r == 1) {
        this.codeSended = true;
      }
      this.loading = false;
    }).catch((err: any) => {
      console.log(err);
    });
  }

  setValue(value: any): void {
    this.code = value;
  }

  validateEmailAndCode(): void {
    this.loading = true;
    const validateEmailAndCode = this.core.validateemailandcode({email: this.email, codigo: this.code}).toPromise();
    Promise.resolve(validateEmailAndCode).then((r: any) => {
      if(r == true) {
        let code = btoa(btoa('codigo_empresa'));
        localStorage.setItem('email', this.email);
        localStorage.setItem(code, btoa(btoa(this.code)));
        this.router.navigate(['/inicio/empresas']);
      } else {
        Swal.fire('No se pudo confirmar su código', 'Lo sentimos, verifique su correo nuevamente!', 'error');
      }
      this.loading = false;
    }).catch((err: any) => {
      console.log(err);
    });
  }

  goBackAndSendAgain(): void {
    this.codeSended = false;
  }

}
