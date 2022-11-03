import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() onAction = new EventEmitter<any>();
  @Input() data;
  @Input() table;
  
  constructor() { }

  ngOnInit(): void {
  }

  performAction(type: any, index: number) {
    this.onAction.emit({ type: type, index: index });
  }

}
