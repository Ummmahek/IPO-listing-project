import React, { useState, useEffect } from "react";
import { fetchIPOTrends } from "../api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graphs() {
    const [trends, setTrends] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchIPOTrends();
                setTrends(data);
            } catch (err) {
                setError("Failed to load IPO trends");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading trends...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!trends) return null;

    const chartData = {
        labels: trends.labels,
        datasets: trends.datasets
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'IPO Trends Analysis'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h3>IPO Market Trends</h3>
            <div style={{ height: "400px" }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}