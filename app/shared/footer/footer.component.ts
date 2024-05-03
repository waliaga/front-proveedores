import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear = (new Date()).getFullYear();

  constructor() {
  }

  ngOnInit(): void {
  }

  openWhatsappMessage(): void {
    window.open(
      'https://wa.me/59176108443?text=Hola%20TrydentServices,%20me%20interesan%20los%20servicios%20que%20ofreces.',
      '_blank'
    );
  }

  openFacebookAccount(): void {
    window.open(
      'https://www.facebook.com/Trydent-Services-111104524912672',
      '_blank'
    );
  }

}
