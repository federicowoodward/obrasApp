import { Component } from '@angular/core';
import { ElementsTableComponent } from '../../shared/element-table/elements-table.component';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-deposit',
  imports: [ElementsTableComponent, Divider],
  templateUrl: './deposit.html',
  styleUrl: './deposit.scss'
})
export class Deposit {

}
