import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import {Spinner } from 'react-bootstrap';
import axios from "@/pages/api/axios"

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Statistics = () => {

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 280,
      },
      grid: {
        borderColor: "#f2f6f7",
        show: true,
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
          borderradius: "5px",
          colors: {
            ranges: [
              {
                from: -100,
                to: -46,
                color: "#ebeff5",
              },
              {
                from: -45,
                to: 0,
                color: "#ebeff5",
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
      },
      legend: {
        show: true,
        position: "top",
      },
      xaxis: {
        type: "month",
        categories: [
          'Janv.',
          'Fév.',
          'Mar.',
          'Avr.',
          'Mai',
          'Juin',
          'Juill.',
          'Août',
          'Sept.',
          'Oct.',
          'Nov.',
          'Déc.',
        ],
        axisBorder: {
          show: true,
          color: "rgba(119, 119, 142, 0.05)",
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: true,
          borderType: "solid",
          color: "rgba(119, 119, 142, 0.05)",
          width: 6,
          offsetX: 0,
          offsetY: 0,
        },
        labels: {
          rotate: -90,
        },
      },
      yaxis: {
        title: {
          text: "stats",
          style: {
            color: "#adb5be",
            fontSize: "14px",
            fontFamily: "poppins, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-label",
          },
        },
        labels: {
          formatter: function (y) {
            return y.toFixed(0) + "";
          },
        },
      },
      fill: {
        opacity: 1,
      },
    },
  });

  useEffect(() => {
    const fetchDataSolution = async () => {
          try {
              const response = await axios.get('/solutions');
              processSolutions(response.data.data);

              console.log('response.data.data', response.data.data )
          } catch (err) {
              console.error('Error fetching solution data:', err);
          }
    }
    fetchDataSolution();
  }, []);


  const processSolutions = (solutions) => {
      const groupedData = groupDataByMonthAndStatus(solutions);

      setChartData((prevData) => ({
        ...prevData,
        series: groupedData.series,
        options: {
          ...prevData.options,
          xaxis: {
            ...prevData.options.xaxis,
            categories: groupedData.categories,
          },
          colors: groupedData.colors,
        },
      }));
    }

  const groupDataByMonthAndStatus = (data) => {
      const groupedData = {}

      data.forEach((solution) => {
        const month = new Date(solution.createdAt).toLocaleString('en-US', {month: 'short'});
        const status = solution.status.name;

        if (!groupedData[month]) {
          groupedData[month] = {}
        }

        if (!groupedData[month][status]) {
          groupedData[month][status] = 0;
        }

        groupedData[month][status] += 1;

      });

      const categories = Object.keys(groupedData).map((month) => month);
      const series = Object.keys(groupedData[Object.keys(groupedData)[0]]).map((status) => {
        return {
          name: status,
          data: Object.keys(groupedData).map((month) => groupedData[month][status] || 0),
        }
      });

      const colors = series.map((item) => getStatusColor(item.name));
      return {categories, series, colors};
    };

  const getStatusColor = (status) => {
      switch (status) {
        case 'En attente':
          return '#A67360';
        case 'Cartographiée':
          return '#38cab3';
        case 'Explorée':
          return '#89A3D9';
        case 'Experimentée':
          return '#BAD9D9';
        default:
          return '#e74c3c';
      }
    };

  return (
      <div id="chart">
        {
            chartData.series.length === 0 ? (
                    <div className="text-center">
                      <Spinner animation="border" variant="primary" />
                    </div>
                ) :
                (
                <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={280}
            />
            )
        }
      </div>
  );
};

export default Statistics;

