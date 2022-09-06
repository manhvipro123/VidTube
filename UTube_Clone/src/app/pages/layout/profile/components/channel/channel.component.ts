import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  isCurrent: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  detectIsCurrent(number: number){
    this.isCurrent = number;
  }

}
