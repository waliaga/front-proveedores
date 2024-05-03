import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CoreService} from "../../core/core.service";
import {ValidationService} from "../../core/validation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edicion-de-proveedor',
  templateUrl: './edicion-de-proveedor.component.html',
  styleUrls: ['./edicion-de-proveedor.component.css']
})
export class EdicionDeProveedorComponent implements OnInit {

  public data:any;

  @Output() end: EventEmitter<boolean> = new EventEmitter<boolean>();

  public email:string;
  public code:any;
  public errorInfo:boolean = false;

  public info:any = {
    email: '',
    code: '',
    error: false
  };

  public globalError = false;
  public globalSuccess = false;
  public globalWarning = false;
  public errorMessage: string;
  public successMessage: string;
  public warningMessage: string;

  public submitted = false;
  public error = false;
  public onload = false;

  public loading: boolean = false;
  public nodata: boolean = false;

  constructor(
      private core: CoreService,
      private validation: ValidationService,
      private router: Router
  ) {
    this.validation.checkLocalStorage().then((r:any) => {
      this.info = r;
      this.check();
    });
  }

  ngOnInit(): void {
  }

  check() :void {
    if(this.info.error == true) {
      this.router.navigate(['/inicio']);
    } else {
      this.email = this.info.email;
      this.code = this.info.code;
      this.errorInfo = this.info.error;
      this.init();
    }
  }

  init():void {
    this.loading = true;
    const forCheck = this.core.getproveedorinfo({email: this.email, code: this.code}).toPromise();
    Promise.resolve(forCheck).then((r:any) => {
      if(r==false){
        this.nodata = true;
      } else {
        this.data = {
          nombre_empresa:         {value:r.nombre_empresa, error:false, validation: 'required'},
          nit:                    {value:r.nit, error:false, validation: 'required'},
          pais:                   {value:r.pais, error:false, validation: 'required'},
          ciudad:                 {value:r.ciudad, error:false, validation: 'required'},
          telefono:               {value:r.telefono, error:false, validation: 'required'},
          nombre_completo:        {value:r.representantelegal.nombre_completo, error:false, validation: 'required'},
          telefono_representante: {value:r.representantelegal.telefono_representante, error:false, validation: 'required'},
          email_representante:    {value:r.representantelegal.email_representante, error:false, validation: 'required'},
          email:                  {value:this.email, error:false, validation: 'required'},
          codigo:                 {value:this.code, error:false, validation: 'required'},
        };
        this.nodata = false;
      }
    }).finally(() => {
      this.loading = false;
    }).catch((err:any) => {
      console.log(err);
    });
  }

  onSubmit():void {
    this.submitted = true;
    this.loading = true;
    this.validation.validateAll(this.data);
    if(!this.validation.verifyErrorInput(this.data)) {
      this.globalError = false;
      const save = this.core.updateproveedor(this.validation.returnOnlyValues(this.data)).toPromise();
      Promise.resolve(save).then((r:any) => {
        this.globalSuccess = true;
        this.successMessage = 'Registro aprovado';
        this.final();
      }).finally(() => {
        this.loading = false;
      }).catch((err:any) => {
        this.globalError = true;
        this.errorMessage = 'No podemos guardar, hay un error de validación';
        this.submitted = true;
      });
    } else {
      this.loading = false;
      this.globalError = true;
      this.errorMessage = 'Hay un error en algún campo, verifique el llenado correcto.';
    }
  }

  final():void {
    this.end.emit(true);
  }

}
