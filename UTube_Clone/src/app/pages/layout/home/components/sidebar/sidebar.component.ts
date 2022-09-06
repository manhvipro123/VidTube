import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InteractService } from 'src/app/services/interact.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slidein', [
      transition(':enter', [
        // when ngif has true
        style({ transform: 'translateX(-40%)' }),
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        // when ngIf has false
        animate(250, 
        style({ transform: 'translateX(-40%)' }))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  isMinimize: boolean = true;
  constructor(private interactService: InteractService, private changeDetector: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.interactService.listenToggleMenu((isCheck) => {
      this.isMinimize = isCheck
      console.log(this.isMinimize)
      // this.changeDetector.detectChanges()
    });

  }

}
