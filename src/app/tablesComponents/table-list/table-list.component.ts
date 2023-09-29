import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTables } from '../../store/actions';  
import { Observable } from 'rxjs';
import { Table } from '../table.type';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  tables$!: Observable<Table[]>; 
  fileName!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ tables: Table[] }>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fileName = params['fileName'];
      this.store.dispatch(loadTables({ fileName: this.fileName }));
      this.tables$ = this.store.select('tables');
    });
  }

  onTableSelected(index: number) {
    this.router.navigate([`/files/${this.fileName}/tables/${index}`]);
  }
}
