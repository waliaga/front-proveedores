import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CoreService} from "../../core/core.service";

@Component({
    selector: 'app-proveedor-registrado',
    templateUrl: './proveedor-registrado.component.html',
    styleUrls: ['./proveedor-registrado.component.css']
})
export class ProveedorRegistradoComponent implements OnInit {

    public data:any;
    public email:string;
    public code:any;

    public loading: boolean = false;
    public nodata: boolean = false;

    constructor(
        private router: Router,
        private core: CoreService
    ) {
      this.checkLocalStorage();
    }

    ngOnInit(): void {
      this.checkProveedorInfo();
    }

    checkLocalStorage(): void {
      let code = btoa(btoa('codigo_empresa'));
      if(localStorage.getItem('email') != null) {
        this.email = localStorage.getItem('email');
      } else {
        this.router.navigate(['/inicio']);
      }
      if(localStorage.getItem(code) != null) {
        this.code = localStorage.getItem(code);
      } else {
        this.router.navigate(['/inicio']);
      }
    }

    checkProveedorInfo(): void {
      const forCheck = this.core.getproveedorinfo({email: this.email, code: this.code}).toPromise();
      Promise.resolve(forCheck).then((r:any) => {
          if(r==false){
              this.nodata = true;
          } else {
              this.data = r;
              this.nodata = false;
          }
      }).catch((err:any) => {
          console.log(err);
      });
    }

    reload() : void {
        delete this.data;
        this.checkProveedorInfo();
    }

}
