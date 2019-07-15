import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { FormBuilder,FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  title : String;
  createForm : FormGroup
  constructor(private issueService : IssueService,private fb : FormBuilder,private router : Router,private snackBar : MatSnackBar) { 
     this.createForm = this.fb.group({
       title : ['',Validators.required],
       responsible : '',
       description : '',
       severity : ''
     })
  }

  addIssue(title,responsible,description,severity) {
      this.issueService.addIssue(title,responsible,description,severity).subscribe(() => {
        this.router.navigate(['/list']);
      })
      this.snackBar.open("Create success","OK", {
        duration : 3000
      })
  }
  ngOnInit() {
  }


}
