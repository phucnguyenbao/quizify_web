import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentChart = ({ chartData }) => {
    // Chuyển đổi dữ liệu mẫu của bạn thành định dạng mà Chart.js cần
    const data = {
        labels: chartData.map(d => d.department), // Tên các phòng ban
        datasets: [
            {
                label: 'Average Score',
                data: chartData.map(d => d.avgScore), // Điểm số
                backgroundColor: [ // Mảng màu sắc cho từng phần
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Tùy chọn cấu hình cho biểu đồ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right', // Hiển thị chú thích bên phải
            },
            title: {
                display: true,
                text: 'Chart of average scores by Department',
                font: {
                    size: 16
                }
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default DepartmentChart;