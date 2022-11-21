import {Component, Inject,OnInit} from '@angular/core';


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
/**
 * @title Injecting data when opening a dialog
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor() {}



  ngOnInit(): void {
  }

}



