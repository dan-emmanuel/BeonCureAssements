import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTables } from '../../store/actions';  
import { Observable } from 'rxjs';
import * as fromRoot from '../../store/selectors';
import { TableTitleAndIndex } from '../table.type';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css', '../../sharedCSS/row.css']
})
export class TableListComponent implements OnInit {

  tables$!: Observable<TableTitleAndIndex[]>; 
  fileName!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ tables: TableTitleAndIndex[] }>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fileName = params['fileName'];
      this.store.dispatch(loadTables({ fileName: this.fileName }));
      this.tables$ = this.store.select(fromRoot.selectTables);      
    });
  }
  shouldHideButton(): boolean {
    return this.router.url.startsWith('*/files/');
  }
  onTableSelected(index: number) {
    this.router.navigate([`/files/${this.fileName}/tables/${index}`]);
  }
}
