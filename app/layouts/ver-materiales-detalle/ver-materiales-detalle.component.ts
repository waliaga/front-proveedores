import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoreService} from "../../core/core.service";
import {ValidationService} from "../../core/validation.service";

@Component({
    selector: 'app-ver-materiales-detalle',
    templateUrl: './ver-materiales-detalle.component.html',
    styleUrls: ['./ver-materiales-detalle.component.css']
})
export class VerMaterialesDetalleComponent implements OnInit {

    @Input() data: any;
    @Input() email:string;
    @Input() codigo:any;
    @Output() end: EventEmitter<boolean> = new EventEmitter<boolean>();

    public datos:any;

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
    ) {
    }

    ngOnInit(): void {
        this.init();
    }

    init():void {
        this.datos = {
            costo_unitario:     {value:null, error: false, validation: 'required'},
            email:              {value:this.email, error: false, validation: 'required'},
            codigo:             {value:this.codigo, error: false, validation: 'required'},
            id_material:        {value:this.data?.id_material, error: false, validation: 'required'},
            status:             {value:'A', error: false, validation: 'required'}
        }
    }

    onSubmit():void {
        this.submitted = true;
        this.loading = true;
        console.log(this.datos);
        this.validation.validateAll(this.datos);
        if(!this.validation.verifyErrorInput(this.datos)) {
            this.globalError = false;
            const save = this.core.savemyproposal(this.validation.returnOnlyValues(this.datos)).toPromise();
            Promise.resolve(save).then((r:any) => {
                this.globalSuccess = true;
                this.successMessage = 'Propuesta enviada';
                setTimeout(() => {
                    this.close();
                }, 500);
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

    close():void {
        this.end.emit(true);
    }

}
