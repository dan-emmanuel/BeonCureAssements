import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileListComponent } from './tablesComponents/file-list/file-list.component';
import { TableListComponent } from './tablesComponents/table-list/table-list.component';
import { TableDetailComponent } from './tablesComponents/table-detail/table-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/files', pathMatch: 'full' },
  { path: 'files', component: FileListComponent },
  { path: 'files/:fileName', component: TableListComponent },
  { path: 'files/:fileName/tables/:tableIndex', component: TableDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
