/**
 * Theme: Robotech - Tailwind Admin Dashboard Template
 * Author: Mannatthemes
 * Analytics Dashboard Js
 */

try{
  var options = {
    chart: {
      height: 345,
      type: 'bar',
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
          horizontal: false,
          columnWidth: '30%',
      },
    },
    colors: ['#3874ff'],
    dataLabels: {
        enabled: false
    },
    
    
    stroke: {
        show: true,
        width: 2,
    },
    series: [{
        name: 'Income',
        data: [0, 160, 100, 210, 145, 400, 155, 210, 120, 275, 110, 200, 100, 90, 220, 100, 180, 140, 315, 130, 105, 165, 120, 160, 100, 210, 145, 400, 155, 210, 120]
    }],
    labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
     "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", 
     "24", "25", "26", "27", "28", "29", "30", "31",],
    
    yaxis: {
      labels: {      
        offsetX: -12,
        offsetY: 0,      
      }
    },
    grid: {
      borderColor: '#e0e6ed',
      strokeDashArray: 3,
      xaxis: {
          lines: {
              show: false
          }
      },   
      yaxis: {
          lines: {
              show: true,
          }
      },
    }, 
    legend: {
     show: false
    },
    tooltip: {
      marker: {
        show: true,
      },
      x: {
        show: false,
      }
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                return "$" + value ;
            }
        },
    },
    fill: {
      opacity: 1,
    },
  };
  
  var chart = new ApexCharts(document.querySelector("#Revenu_Status"), options);
  chart.render();

}catch (err) {}
try{
  var options = {
    chart: {
        height: 270,
        type: 'donut',
    }, 
    plotOptions: {
      pie: {
        donut: {
          size: '85%'
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
  
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
   
    series: [50, 25, 25,],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      floating: false,
      fontSize: '13px',
      offsetX: 0,
      offsetY: 0,
    },
    labels: [ "Mobile","Tablet", "Desktop" ],
    colors: ["#2a76f4","rgba(42, 118, 244, .5)","rgba(42, 118, 244, .18)"],
   
    responsive: [{
        breakpoint: 600,
        options: {
          plotOptions: {
              donut: {
                customScale: 0.2
              }
            },        
            chart: {
                height: 240
            },
            legend: {
                show: false
            },
        }
    }],
    tooltip: {
      y: {
          formatter: function (val) {
              return   val + " %"
          }
      }
    }
    
  }
  
  var chart = new ApexCharts(
    document.querySelector("#ana_device"),
    options
  );
  
  chart.render();

}catch (err) {}


try{
  // saprkline chart


var dash_spark_1 = {
    
  chart: {
      type: 'area',
      height: 50,
      sparkline: {
          enabled: true
      },
  },
  stroke: {
      curve: 'smooth',
      width: 1.5
    },
  fill: {
      opacity: 1,
      gradient: {
        shade: '#add8e6',
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 80, 100],
        colorStops: []
    },
  },
  series: [{
    data: [4, 8, 5, 10, 4, 16, 5, 11, 6, 11, 30, 10, 13, 4, 6, 3, 6]
  }],
  yaxis: {
      min: 0
  },
  colors: ['#add8e6'],
  tooltip: {
    show: false,
  }
}
new ApexCharts(document.querySelector("#dash_spark_1"), dash_spark_1).render();
}catch (err) {}

try{
 
}catch(err){}