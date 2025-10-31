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
    if (this.addMode) {
      this.createDrink()
    } else {
      this.updateDrink()
    }
  }

  createDrink() {
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

  edit(drink: any) {
    console.log(drink)

    // this.drinkForm.patchValue({
    //   id: drink.id,
    //   drink: drink.drink,
    //   amount: drink.amount,
    //   price: drink.price,
    //   type: drink.type,
    //   package: drink.package
    // });
    
    this.drinkForm.patchValue(drink);
    this.addMode = false;
  }

  updateDrink() {
    console.log('Update árnyékeljárás...')
    this.addMode = true;
  }
  delete(id: number) {
    this.drinkapi.deleteDrink$(id).subscribe({
      next: (result) => {
        console.log('Sikeres törlés', result)
        this.getDrinks()
      }
    })
  }

  setMode() {
    this.addMode = true;
    this.drinkForm.reset();
  }
}
