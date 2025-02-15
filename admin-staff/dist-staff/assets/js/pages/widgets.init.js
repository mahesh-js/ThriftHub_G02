/**
 * Theme: Robotech - Responsive Tailwindcss Admin Dashboard
 * Author: Mannatthemes
 * Widgets Js
 */

try{
  var options = {
    chart: {
        height: 315,
        type: 'area',
        width: '100%',
        stacked: true,
        toolbar: {
          show: false,
          autoSelected: 'zoom'
        },
        dropShadow: {
          enabled: true,
          top: 12,
          left: 0,
          bottom: 0,
          right: 0,
          blur: 2,
          color: "rgba(132, 145, 183, 0.3)",
          opacity: 0.35,
        },
    },
    colors: ['#2a77f4', '#57cafd'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        width: [1.5, 1.5],
        dashArray: [0, 4],
        lineCap: 'round',
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      },
      strokeDashArray: 3,
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    series: [{
        name: 'New Visits',
        data: [0,60,20,90,45,110,55,130,44,110,75,120]
    }, {
        name: 'Unique Visits',
        data: [0,45,10,75,35,94,40,115,30,105,65,110]
    }],
  
    xaxis: {
        type: 'month',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
          show: true,
        },  
        axisTicks: {
          show: true,
        },                  
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    },
  }
  
  var chart = new ApexCharts(
    document.querySelector("#crm-dash"),
    options
  );
  
  chart.render();
  
  }catch (err) {}

  try{
    var options = {
      chart: {
        height: 250,
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "85%",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
    
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
    
      series: [50, 25, 25],
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: false,
        fontSize: "13px",
        offsetX: 0,
        offsetY: 0,
      },
      labels: ["Mobile", "Tablet", "Desktop"],
      colors: ["#2a76f4", "rgba(42, 118, 244, .5)", "rgba(42, 118, 244, .18)"],
    
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              donut: {
                customScale: 0.2,
              },
            },
            chart: {
              height: 240,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " %";
          },
        },
      },
    };
    
    var chart = new ApexCharts(document.querySelector("#ana_device"), options);
    chart.render();
    
    }catch (err) {}

    try{
      var chartDom = document.getElementById("visitors");
      var myChart = echarts.init(chartDom);
      var option;
    
      const data = [];
      for (let i = 0; i < 4; ++i) {
        data.push(Math.round(Math.random() * 200));
      }
      option = {
        grid: {
          left: "1%",
          right: "7%",
          bottom: "0%",
          top: "4%",
          containLabel: true,
        },
        xAxis: {
          max: "dataMax",
          axisLine: {
            lineStyle: {
              color: "#858d98",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(133, 141, 152, 0.1)",
            },
          },
        },
        yAxis: {
          type: "category",
          data: ["Organic", "Direct", "Campaign", "Social Media"],
          inverse: true,
          gridIndex: 0,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 3, // only the largest 3 bars will be displayed,
          axisLabel: {
            color: "#858d98",
          },
          axisLine: {
            lineStyle: {
              color: "rgba(133, 141, 152, 0.2)",
            },
          },
          axisTick: {
            lineStyle: {
              color: "rgba(133, 141, 152, 0.5)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(133, 141, 152, 0.1)",
            },
          },
        },
        series: [
          {
            realtimeSort: true,
            name: "Visitors",
            type: "bar",
            data: data,
            barWidth: "8",
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
              color: "#95aac9",
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: [0, 2, 2, 0],
              },
              normal: {
                barBorderRadius: [0, 2, 2, 0],
                color: "#5997ff",
              },
            },
          },
        ],
    
        legend: {
          show: false,
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
      function run() {
        for (var i = 0; i < data.length; ++i) {
          if (Math.random() > 0.9) {
            data[i] += Math.round(Math.random() * 2000);
          } else {
            data[i] += Math.round(Math.random() * 200);
          }
        }
        myChart.setOption({
          series: [
            {
              type: "bar",
              data,
            },
          ],
        });
      }
      setTimeout(function () {
        run();
      }, 0);
      setInterval(function () {
        run();
      }, 3000);
    
      option && myChart.setOption(option);
    }catch (err) {
    
    }


var options = {
  series: [
  {
    name: 'U.Budget',
    data: [
      {
        x: 'Banking',
        y: 1292,
        goals: [
          {
            name: 'T.Budget',
            value: 1400,
            strokeHeight: 5,
            strokeColor: '#f1cb8d'
          }
        ]
      },
      {
        x: 'Body Care',
        y: 4432,
        goals: [
          {
            name: 'T.Budget',
            value: 5400,
            strokeHeight: 5,
            strokeColor: '#f1cb8d'
          }
        ]
      },
      {
        x: 'GPS System',
        y: 5423,
        goals: [
          {
            name: 'T.Budget',
            value: 5200,
            strokeHeight: 5,
            strokeColor: '#f1cb8d'
          }
        ]
      },
      {
        x: 'Transfer money',
        y: 6653,
        goals: [
          {
            name: 'T.Budget',
            value: 6500,
            strokeHeight: 5,
            strokeColor: '#f1cb8d'
          }
        ]
      },
      {
        x: 'Ticket Book',
        y: 8133,
        goals: [
          {
            name: 'T.Budget',
            value: 6600,
            strokeHeight: 13,
            strokeWidth: 0,
            strokeLineCap: 'round',
            strokeColor: '#f1cb8d'
          }
        ]
      },
    ]
  }
],
  chart: {
  height: 340,
  type: 'bar',
  toolbar: {
    show: false
  },
},
plotOptions: {
  bar: {
    columnWidth: '20%'
  }
},
colors: ['#2f7df0'],
dataLabels: {
  enabled: false
},
yaxis: {
  labels: {
    offsetX: -12,
    offsetY: 0,
    formatter: function (value) {
      return "$" + value ;
  }
  },
},
legend: {
  show: true,
  showForSingleSeries: true,
  customLegendItems: ['Used Budget', 'Total Budget'],
  markers: {
    fillColors: ['#2f7df0', '#f1cb8d']
  }
},
  grid: {
    row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,           
    },
    strokeDashArray: 2.5,
    },
};

var chart = new ApexCharts(document.querySelector("#Budget_chart"), options);
chart.render();


try {
var names = [
  ["Redesign website", [0, 7]],
  ["Write new content", [1, 4]],
  ["Apply new styles", [3, 6]],
  ["Review", [7, 7]],
  ["Deploy", [8, 9]],
  ["Go Live!", [10, 10]]
];

var tasks = names.map(function(name, i) {
  var today = new Date();
  var start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  var end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  start.setDate(today.getDate() + name[1][0]);
  end.setDate(today.getDate() + name[1][1]);
  return {
      start: start,
      end: end,
      name: name[0],
      id: "Task " + i,
      progress: parseInt(Math.random() * 100, 10)
  }
});
tasks[1].dependencies = "Task 0"
tasks[2].dependencies = "Task 1"
tasks[3].dependencies = "Task 2"
tasks[5].dependencies = "Task 4"


// change view mode example
var gantt = new Gantt("#gantt", tasks, {
  header_height: 40,
  column_width: 20,
  step: 24,
  view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
  bar_height: 20,
  bar_corner_radius: 3,
  arrow_curve: 5,
  padding: 18,
  view_mode: 'Day',
  date_format: 'YYYY-MM-DD',
  language: 'en', // or 'es', 'it', 'ru', 'ptBr', 'fr', 'tr', 'zh', 'de', 'hu'
  custom_popup_html: null
});
gantt.change_view_mode('Week');

document.querySelector(".btn-group").addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    var buttons = event.currentTarget.querySelectorAll("button");
    var mode = event.target.textContent;
    gantt.change_view_mode(mode);
    buttons.forEach(function(button) {
      button.classList.remove("active");
    });
    event.target.classList.add("active");
  }
});
}catch (err) {}