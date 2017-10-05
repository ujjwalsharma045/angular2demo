import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {HttpClient} from '@angular/common/http';

declare var $:any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
	
	siteUrl = 'http://localhost:8081/';
	private totaluser;
	private totalpage;
	private totalcategory;
	private totalproduct;
	constructor(private http: HttpClient) { 
	
	}
	
    ngOnInit(){
        var dataSales = {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [
             [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
          ]
        };

        var optionsSales = {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false,
        };

        var responsiveSales = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


        var data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartActivity', data, options, responsiveOptions);

        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };

        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

        Chartist.Pie('#chartPreferences', {
          labels: ['62%','32%','6%'],
          series: [62, 32, 6]
        });
		
		this.getTotalUser().subscribe(result => {
		    //console.log(result['users']);
		    this.totaluser  = result['users'];	 	   
	    });
		
		this.getTotalPage().subscribe(result => {
		    //console.log(result['pages']);			
		    this.totalpage  = result['pages'];	 	   
	    });

        this.getCategoryCount().subscribe(result => {
		    //console.log(result['pages']);			
		    this.totalcategory  = result['categories'];	 	   
	    });

        this.getProductCount().subscribe(result => {
		    //console.log(result['pages']);			
		    this.totalproduct  = result['products'];	 	   
	    });  		
    }
	
	getTotalUser(){
	    return this.http.get(this.siteUrl+"totalusers");
	}

	getTotalPage(){
		return this.http.get(this.siteUrl+"page/total");
	}
	
	getCategoryCount(){
		return this.http.get(this.siteUrl+"category/total");
	}
	
	getProductCount(){
		return this.http.get(this.siteUrl+"product/total");
	}
}
