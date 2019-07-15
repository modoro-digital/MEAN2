import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Issue } from '../issue.model';
import { IssueService } from '../issue.service';
import { MatSnackBar } from '@angular/material';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component'; 
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  issues: Issue[]= [];
  titleSearch : String;
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];
  constructor(private issueService: IssueService, private router: Router,private snackBar : MatSnackBar,private dialog : MatDialog) { }
  ngOnInit() {
    this.fetchIssues();
  }
  fetchIssues() {
    this.issueService
    .getIssues()
    .subscribe((data: Issue[]) => {
      this.issues = data;
      console.log('Data requested ... ');
      console.log(this.issues);
    });
  }
  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }
  deleteIssue(id) {
    if(confirm('Bạn có chắc chắn muốn xóa không')) {
      this.issueService.deleteIssue(id).subscribe(() => {
        this.fetchIssues();
        this.snackBar.open("Delete success", "OK", {
          duration: 3000
        })
      });
    } 
  }

  search() {
    if(this.titleSearch == "") {
      this.ngOnInit();
    }
    else {
      this.issues = this.issues.filter(res => {
        return res.title.toLocaleLowerCase().match(this.titleSearch.toLocaleLowerCase());
      })
    }
    
  }

  
}