import {Component, OnInit, ViewChild} from '@angular/core';
import {CoreService} from "../../core/core.service";
import {Router} from "@angular/router";
import {ValidationService} from "../../core/validation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-ver-materiales',
    templateUrl: './ver-materiales.component.html',
    styleUrls: ['./ver-materiales.component.css']
})
export class VerMaterialesComponent implements OnInit {

    public data:any;
    public dataSend:any;

    public email: string;
    public code: any;
    public errorInfo: boolean = false;

    public endProposal:boolean=false;
    public sendedProposalConfirm:boolean=false;

    public info: any = {
        email: '',
        code: '',
        error: false
    };

    public nodata: boolean;

    @ViewChild('materialdetalle') private materialdetalle;

    constructor(
        private core: CoreService,
        private router: Router,
        private validation: ValidationService,
        private modalService: NgbModal,
    ) {
        this.validation.checkLocalStorage().then((r: any) => {
            this.info = r;
            this.check();
        });
        this.checkSendedProposal();
    }

    ngOnInit(): void {
        this.checkMateriales();
    }

    checkSendedProposal():void {
        if(localStorage.getItem('sp') != null) {
            this.sendedProposalConfirm = true;
        } else {
            this.sendedProposalConfirm = false;
        }
    }

    updateCheckProposalButton() :void {
        localStorage.removeItem('sp');
        this.sendedProposalConfirm = false;
    }

    check(): void {
        if (this.info.error == true) {
            this.router.navigate(['/inicio']);
        } else {
            this.email = this.info.email;
            this.code = this.info.code;
            this.errorInfo = this.info.error;
        }
    }

    checkMateriales(): void {
        const checkmateriales = this.core.getmaterialespublicados({email: this.email, codigo: this.code}).toPromise();
        Promise.resolve(checkmateriales).then((r:any) => {
            this.data = r;
        }).catch((err:any) => {
            console.log(err);
        });
    }

    openDetailWithData(detail:any): void {
        this.dataSend = detail;
        this.openModal(this.materialdetalle, 'xl', true, true, true);
    }

    openModal(largeDataModal: any, size = 'lg', dismiss = true, keyboard = true, scrollable = false) {
        this.modalService.open(largeDataModal, {
            size: size,
            keyboard: keyboard,
            beforeDismiss: () => {
                return dismiss;
            },
            scrollable: scrollable
        });
    }

    justClose(e: boolean) {
        if (e) {
            this.modalService.dismissAll('Finished');
            this.checkMateriales();
        }
    }

    endMyProposal():void {
        this.endProposal = true;
        const sendProposal = this.core.sendmyproposal({email: this.email, codigo: this.code}).toPromise();
        Promise.resolve(sendProposal).then((r:any) => {
            this.sendedProposalConfirm = r;
            localStorage.setItem('sp', '1');
        }).finally(() => {
            this.endProposal = false;
        }).catch((err:any) => {
            console.log(err);
        });
    }

}
