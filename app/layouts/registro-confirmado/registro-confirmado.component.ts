import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CoreService} from "../../core/core.service";
import {Router} from "@angular/router";
import {ValidationService} from "../../core/validation.service";

@Component({
    selector: 'app-registro-confirmado',
    templateUrl: './registro-confirmado.component.html',
    styleUrls: ['./registro-confirmado.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class RegistroConfirmadoComponent implements OnInit {

    public currentSection = 'home';

    public email:string;
    public code:any;
    public errorInfo:boolean = false;
    public enableRegisterButton:boolean = true;

    public loading: boolean = false;
    public mostrarOcultar:boolean = false;

    public acciones:any = {
      registro: false,
      editar: false,
      materiales: false
    };

    public info:any = {
        email: '',
        code: '',
        error: false
    };

    public nodata: boolean;

    constructor(
        private core: CoreService,
        private router: Router,
        private validation: ValidationService
    ) {
        this.validation.checkLocalStorage().then((r:any) => {
            this.info = r;
            this.check();
        });
    }

    ngOnInit(): void {

    }

    checkProveedorData() :void {
        this.loading = true;
        const check = this.core.checkproveedordata({email: this.email, codigo: this.code}).toPromise();
        Promise.resolve(check).then((r:any) => {
            this.nodata = r;
            if(!this.nodata) {
                this.enableRegister();
            } else {
                this.enableRegisterButton = false;
                this.enableMaterial();
            }
        }).finally(() => {
            this.loading = false;
        }).catch((err:any) => {
            console.log(err);
        });
    }

    checkAndCloseMaybe(e:boolean): void {
        if(e) {
            setTimeout(() => {
                this.checkProveedorData();
            }, 500);
        }
    }

    check() :void {
        if(this.info.error == true) {
            this.router.navigate(['/inicio']);
        } else {
            this.email = this.info.email;
            this.code = this.info.code;
            this.errorInfo = this.info.error;
            this.checkProveedorData();
        }
    }

    /**
     * Window scroll method
     */
    windowScroll(): void {
        const navbar = document.getElementById('navbar');
        if (document.body.scrollTop >= 50 || document.documentElement.scrollTop > 50) {
            navbar.classList.add('nav-sticky');
        } else {
            navbar.classList.remove('nav-sticky');
        }
    }

    /**
     * Section changed method
     * @param sectionId specify the current sectionID
     */
    onSectionChange(sectionId: string): void {
        this.currentSection = sectionId;
    }

    /**
     * Toggle navbar
     */
    toggleMenu(): void {
        document.getElementById('navbarCollapse').classList.toggle('show');
    }

    enableRegister():void {
        this.acciones.registro = true;
        this.acciones.editar = false;
        this.acciones.materiales = false;
    }

    enableEdit():void {
        this.acciones.registro = false;
        this.acciones.editar = true;
        this.acciones.materiales = false;
    }

    enableMaterial():void {
        this.acciones.registro = false;
        this.acciones.editar = false;
        this.acciones.materiales = true;
    }

    disableAll():void {
        this.acciones.registro = false;
        this.acciones.editar = false;
        this.acciones.materiales = false;
    }

    clearAll() {
        localStorage.clear();
        this.router.navigate(['/inicio']);
    }

    switchView():void {
        this.mostrarOcultar = !this.mostrarOcultar;
    }

}
