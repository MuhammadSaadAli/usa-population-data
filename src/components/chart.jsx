import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables); // Register necessary components for Chart.js

const PopulationChart = ({ historyLength }) => {
    const [data, setData] = useState([]);
    const chartRef = useRef(null); // Reference to store the chart instance

    useEffect(() => {
        const fetchPopulationData = async () => {
            try {
                const response = await fetch(
                    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                const allData = result.data;

                const currentYear = new Date().getFullYear();

                // This Logic Will implement If we will have all the data according to today's date. eg 20 November 2024

                // const filteredData = allData
                //     .filter((item) => item.Year >= currentYear - historyLength -1)
                //     .sort((a, b) => a.Year - b.Year);

                // But for now I am hard coding 2022 because we have the data until 2022
                    const filteredData = allData
                    .filter((item) => item.Year >= allData[0].Year - historyLength +1)
                    .sort((a, b) => a.Year - b.Year);

                setData(filteredData);

                console.log({filteredData, historyLength, currentYear})
                console.log(allData[0])
            } catch (error) {
                console.error("Error fetching population data:", error);
            }
        };

        fetchPopulationData();
    }, [historyLength]);

    const chartData = {
        labels: data.map((item) => item.Year),
        datasets: [
            {
                label: "US Population",
                data: data.map((item) => item.Population),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192)",
                
                tension: 0.4,
            },
        ],
    };

    // const chartOptions = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             display: true,
    //             position: "top",
    //         },
    //     },
    // };



    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                    color: "#eaeaea", // Light gray legend text
                },
            },
            title: {
                display: true,
                text: "US Population Over Time",
                font: {
                    size: 19,
                    weight: "bold",
                },
                color: "#eaeaea", // Light gray title
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#ccc", // Lighter gray for x-axis labels
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)", // Subtle light grid lines
                },
            },
            y: {
                ticks: {
                    color: "#ccc", // Lighter gray for y-axis labels
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)", // Subtle light grid lines
                },
            },
        },
    };
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy the existing chart instance
        }

        chartRef.current = new Chart(document.getElementById("chartCanvas"), {
            type: "line",
            data: chartData,
            options: chartOptions,
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy(); // Cleanup on component unmount
            }
        };
    }, [data]);

    return (
        <div style={{ width: "90%", margin: "0 auto" }}>
            <canvas id="chartCanvas"></canvas>
        </div>
    );
};

export default PopulationChart;
