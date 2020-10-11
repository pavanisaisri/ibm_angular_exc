import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginationModel,TableModel } from 'carbon-components-angular';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})

export class CreateFormComponent implements OnInit {
  createOrder: FormGroup;

  //breakfast menu variables
  breakfastCuisines=  [
    'North Indian', 'South Indian', 'Continental'
  ];
  breakfasts=  [
    {name:'North Indian', dish: [{content:'Poha',id:0},{content: 'Paratha',id:1}]},
    {name:'South Indian' , dish: [{content:'Idly',id:0},{content: 'Vada',id:1}]},
    {name: 'Continental', dish: [{content:'Sandwitch',id:0},{content: 'Pasta',id:1}]}
  ];
  breakfastDishes = [];
  breakfastRadio; 

  //lunch menu variables
  lunchRadio;
  lunchOptions=  [
    {name:'Veg', dish: [{content:'Veg Biryani',id:0},{content: 'Pulao',id:1}]},
    {name:'Non-Veg' , dish: [{content:'Chicken Biryani',id:0},{content: 'Prawn Biryani',id:1}]}
  ];
  lunchDishes = [];

  //dinner menu variables
  dinnerToppings = [
    {topping:'Onion',checked:false},
    {topping:'Tomato',checked:false},
    {topping:'Olives',checked:false},
    {topping:'Sausage',checked:false},
    {topping:'Extra cheese',checked:false},
    {topping:'Pepperoni',checked:false},
    {topping:'Mushrooms',checked:false},
    {topping:'Bacon',checked:false},
    {topping:'Green peppers',checked:false},
    {topping:'Black Olives',checked:false},
    {topping:'Pineapple',checked:false},
    {topping:'Spinach',checked:false}
  ]
  dinnerTableDataArray = []
  dinnerTableData = []
  checkedToppings = []
  dinnerRadio;

  constructor(private formBuilder: FormBuilder, private simpleModel: TableModel, private databaseService: DataServiceService){}

  @Input() model = new PaginationModel();
	@Input() disabled = false;
	@Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() totalDataLength = 105;

  ngOnInit() {
    this.createOrder = this.formBuilder.group({
      breakfastCuisine: [''],
      breakfastDish: [''],
      breakfastSideDish: [''],
      lunchOption: [''],
      lunchDish: [''],
      lunchSideDish: [''],
    });

    this.model.pageLength = 10;
    this.model.currentPage = 1;
    this.model.totalDataLength = 0;
  }

  //pagination
  selectPage(page) {
    this.model.currentPage = page;

    this.dinnerTableDataArray = []
    this.dinnerTableData = []

    for (let index = 0; index < this.checkedToppings.length; index += this.model.pageLength) {
        this.dinnerTableDataArray.push(this.checkedToppings.slice(index, index+this.model.pageLength))
      }

    this.dinnerTableData = this.dinnerTableDataArray[page-1]
	}


  onChangeBreakfast(){
    this.createOrder.value.breakfastCuisine = this.breakfastRadio

    this.breakfasts.forEach(element => {
      if(this.createOrder.value.breakfastCuisine === element.name){
        this.breakfastDishes = element.dish
      }
    });
  }

  onSelectBreakfast(){
    this.createOrder.value.breakfastDish = this.createOrder.value.breakfastDish.content
  }

  onChangeLunch(){
    this.createOrder.value.lunchOption = this.lunchRadio

    this.lunchOptions.forEach(element => {
      if(this.createOrder.value.lunchOption === element.name){
        this.lunchDishes = element.dish
      }
    });
  }

  onChangeTopping(topping, event){
    this.dinnerToppings.map(item => { 
      if(topping == item.topping){
        if(event.checked){
          return item.checked = true
        }else{
          return item.checked = false
        }
      } 
    })

    this.checkedToppings.map(item => { 
      if(topping == item.topping){
        if(event.checked){
          return item.checked = true
        }else{
          return item.checked = false
        }
      } 
    })

    this.dinnerToppings.forEach(element => {
      if(element.topping == topping){
        if(element.checked){
          this.checkedToppings.push({
            topping:element.topping,
            needCustomization:'',
            weight:'',
          checked:true})
        }
      }
    });

    this.checkedToppings = this.checkedToppings.filter(item => item.checked)

    this.model.totalDataLength = this.checkedToppings.length

    this.dinnerTableDataArray = []
    this.dinnerTableData = []

    for (let index = 0; index < this.checkedToppings.length; index += this.model.pageLength) {
      this.dinnerTableDataArray.push(this.checkedToppings.slice(index, index+this.model.pageLength))
    }

    this.dinnerTableData = this.dinnerTableDataArray[0]
    
  }

  onChangeDinner(topping,event){
    this.checkedToppings.map(item => { 
      if(topping == item.topping){
        return item.needCustomization = event.value
      } 
    })
  }

  onChangeWeight(topping,event){
    this.checkedToppings.map(item => { 
      if(topping == item.topping){
        return item.weight = event
      } 
    })
  }

  save(){
    let finalInputs={};
    finalInputs["breakFast"] = {
      "Cuisine" : this.createOrder.value.breakfastCuisine,
      "Dish" : this.createOrder.value.breakfastDish.content,
      "Side Dish" : this.createOrder.value.breakfastSideDish
    }
    finalInputs["Lunch"] = {
      "Option" : this.createOrder.value.lunchOption,
      "Dish" : this.createOrder.value.lunchDish.content,
      "Side Dish" : this.createOrder.value.lunchSideDish
    }
    finalInputs["dinner"] = this.checkedToppings

    console.log(finalInputs);
    let body = {
      "orderPlaced" : finalInputs
    }

    this.databaseService.postRequest(this.databaseService.BASE_URL + "/saveToMongo", body)
      .subscribe(data => {

      }, err => {
        console.log("Error while saving order to mongo")
      });
  }


}
