import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CoreService} from "../../core/core.service";
import {ValidationService} from "../../core/validation.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-registro-de-proveedor',
    templateUrl: './registro-de-proveedor.component.html',
    styleUrls: ['./registro-de-proveedor.component.css']
})
export class RegistroDeProveedorComponent implements OnInit {

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
    public loading = false;
    public error = false;
    public onload = false;

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
        this.data = {
            nombre_empresa:         {value:null, error:false, validation: 'required'},
            nit:                    {value:null, error:false, validation: 'required'},
            pais:                   {value:null, error:false, validation: 'required'},
            ciudad:                 {value:null, error:false, validation: 'required'},
            telefono:               {value:null, error:false, validation: 'required'},
            nombre_completo:        {value:null, error:false, validation: 'required'},
            telefono_representante: {value:null, error:false, validation: 'required'},
            email_representante:    {value:null, error:false, validation: 'required'},
            email:                  {value:this.email, error:false, validation: 'required'},
            codigo:                 {value:this.code, error:false, validation: 'required'},
        }
    }

    onSubmit():void {
        this.submitted = true;
        this.loading = true;
        this.validation.validateAll(this.data);
        if(!this.validation.verifyErrorInput(this.data)) {
            this.globalError = false;
            const save = this.core.registerproveedor(this.validation.returnOnlyValues(this.data)).toPromise();
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
