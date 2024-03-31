import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { Example } from '../services/data.service';
import { response } from 'express';

@Component({
  selector: 'app-example-form',
  templateUrl: './example-form.component.html',
  styleUrls: ['./example-form.component.css']
})
export class ExampleFormComponent implements OnInit {
  examples: Example[] = [];
  name: string = "";
  description: string = "";

  constructor(private http: HttpClient, private dataService: DataService) {}
  
  ngOnInit(): void {
    this.getExampleData();
  }

  submitForm() {
    const data = { name: this.name, description: this.description };
    this.dataService.postExample(data).subscribe(response => {
      if (response) {
        this.name = '';
        this.description = '';
        this.refreshExamples();
      }
    });
  }

  getExampleData() {
    this.dataService.getExamples().subscribe(
      examples => {
        this.examples = examples;
      });
  }

  private refreshExamples() {
    this.dataService.getExamples().subscribe(
      examples => {
        this.examples = examples;
      },
    );
  }
}
