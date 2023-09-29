import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/selectors'
import { Observable } from 'rxjs';
import { Table } from '../table.type';
import { loadTable } from 'src/app/store/actions';



@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {

  table$!: Observable<Table>

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ table: Table | undefined }>  
  ) { 

  }

  ngOnInit() {
    this.route.params.subscribe(params => {      
      const fileName = params['fileName'];
      const tableIndex = +params['tableIndex']; 
      this.store.dispatch(loadTable({ params: { fileName, tableIndex } }));
      this.table$ = (this.store.select(fromRoot.selectTable) as Observable<Table>);
    });
  }
}


