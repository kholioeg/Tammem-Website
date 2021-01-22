import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
})
export class BudgetsComponent implements OnInit {
  companies = true;
  owner = false;
  constructor() {}

  ngOnInit(): void {
    console.log(this.companies);
    console.log(this.owner);
  }

  isCompany(event): void {
    this.companies = true;
    this.owner = false;
  }

  isOwner(event): void {
    this.companies = false;
    this.owner = true;
    console.log(event.target.parentElement.previousSibling.classList);
  }
}
