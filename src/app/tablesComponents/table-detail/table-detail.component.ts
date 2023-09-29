import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/selectors'
import { Observable } from 'rxjs';
import { Table } from '../table.type';



@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {

  table$!: Observable<Table>

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ tables: Table[] }>  
  ) { 

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const fileName = params['fileName'];
      const tableIndex = +params['tableIndex']; 
      this.table$ = this.store.select(state => state.tables[tableIndex]);
    });
  }
}
