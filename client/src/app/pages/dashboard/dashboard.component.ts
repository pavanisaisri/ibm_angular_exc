import { Component, OnInit, Input } from '@angular/core';
import { PaginationModel,TableHeaderItem,TableItem,TableModel } from 'carbon-components-angular';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ordersArray = []
  orders = []
  allOrdersFromMongo = []
  constructor(private simpleModel: TableModel, private databaseService: DataServiceService) { }

  @Input() model = new PaginationModel();
	@Input() disabled = false;
	@Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() totalDataLength = 105;

  async ngOnInit() {
    this.simpleModel.data.shift()
    try {
      let subs: Subscription = await this.databaseService
      .getRequest(this.databaseService.BASE_URL + "getAllOrders", {})
      .subscribe(response => {
        this.allOrdersFromMongo = response;
        console.log("from mongo", this.allOrdersFromMongo);

        this.simpleModel.header = [
          new TableHeaderItem({data: "Breakfast Cuisine"}), 
          new TableHeaderItem({data: "Breakfast Dish" }),
          new TableHeaderItem({data: "Breakfast Side Dish" }),
          new TableHeaderItem({data: "Lunch Option" }),
          new TableHeaderItem({data: "Lunch Dish" }),
          new TableHeaderItem({data: "Lunch Side Dish" }),
          new TableHeaderItem({data: "Dinner Toppings" }),
        ];
        console.log("before",this.simpleModel.data)
        if(this.allOrdersFromMongo){
          if(this.allOrdersFromMongo.length>0){
            this.allOrdersFromMongo.forEach(element => {
              if(element){
                let dinnerOrders =[]
                element['dinner'].forEach(dinner => {
                  dinnerOrders.push("-->Topping: " + dinner.topping + ", Need Customization: " + dinner.needCustomization + ", Weight: " + dinner.weight);
                });
                


                this.simpleModel.data.push([
                  new TableItem({data: element['breakfast'].Cuisine}), 
                  new TableItem({data: element['breakfast'].Dish}),
                  new TableItem({data: element['breakfast']['Side Dish']}), 
                  new TableItem({data: element['lunch'].Option}), 
                  new TableItem({data: element['lunch'].Dish}), 
                  new TableItem({data: element['lunch']['Side Dish']}), 
                  new TableItem({data: dinnerOrders})
                ])
                console.log("loop",this.simpleModel.data)
              }
              
            });

            
          }
        }
    
        console.log("***",this.simpleModel.data)
    
        for (let index = 0; index < this.simpleModel.data.length; index += this.model.pageLength) {
          this.ordersArray.push(this.simpleModel.data.slice(index, index+this.model.pageLength))
        }
    
        this.orders = this.ordersArray[0]
        this.model.totalDataLength = this.simpleModel.data.length;
        
      },
        err => {
          this.allOrdersFromMongo = [];
        },
        () => {
          subs.unsubscribe();
        })
    } catch (error) {
      console.log("Error in getting all orders",error);
      return;
    }

    this.model.pageLength = 10;
    this.model.currentPage = 1;
    
    

    // this.simpleModel.data = [
    //   [new TableItem({data: "Name 1"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],
    //   [new TableItem({data: "Name 3"}), new TableItem({data: "zwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"}), new TableItem({data: "qwer"})],

    // ];
    

    
  }

  //pagination
  selectPage(page) {
    this.model.currentPage = page;

    this.ordersArray = []
    this.orders = []

    for (let index = 0; index < this.simpleModel.data.length; index += this.model.pageLength) {
        this.ordersArray.push(this.simpleModel.data.slice(index, index+this.model.pageLength))
      }

    this.orders = this.ordersArray[page-1]
	}

}
