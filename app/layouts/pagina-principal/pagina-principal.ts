import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-layout1',
    templateUrl: './pagina-principal.html',
    styleUrls: ['./pagina-principal.css'],
    encapsulation: ViewEncapsulation.None,
})

export class PaginaPrincipalComponent implements OnInit {

    currentSection = 'home';

    constructor() {
    }

    ngOnInit(): void {
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

}
