import { Component } from '@angular/core';
import { DrinkapiService } from '../shared/drinkapi.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TypeapiService } from '../shared/typeapi.service';
import { PackageapiService } from '../shared/packageapi.service';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent {

  drinkForm!: any;
  drinks: any;
  types: any;
  packages: any;
  addMode = true;

  constructor(
    private drinkapi: DrinkapiService,
    private typeApi: TypeapiService,
    private packageApi: PackageapiService,
    private build: FormBuilder
  ) {}

  ngOnInit() {
    this.getDrinks()
    this.getTypes()
    this.getPackages()
    this.drinkForm = this.build.group({
      id: [''],
      drink: [''],
      amount: [''],
      price: [''],
      type: [''],
      package: ['']
    })
  }

  save() {
    console.log('Mentés...')
    console.log(this.drinkForm.value)
    this.drinkapi.createDrink$(this.drinkForm.value).subscribe({
      next: (result) => {
        console.log('Sikeres mentés', result)
        this.getDrinks()
        this.drinkForm.reset()
      }
    })
  }

  getDrinks() {
    this.drinkapi.getDrinks$().subscribe({
      next: (result: any) => {
        console.log(result.data)
        this.drinks = result.data
      },
      error: () => {}
    })
  }

  getTypes() {
    this.typeApi.getTypes$().subscribe({
      next: (result: any) => {
        console.log(result.data)
        this.types = result.data;
      }
    })
  }

  getPackages() {
    this.packageApi.getPackages$().subscribe({
      next: (result: any) => {
        // console.log(result.data)
        this.packages = result.data;
      }
    })
  }

  edit() {}
  update() {}
  delete(id: number) {
    this.drinkapi.deleteDrink$(id).subscribe({
      next: (result) => {
        console.log('Sikeres törlés', result)
        this.getDrinks()
      }
    })
  }
}
