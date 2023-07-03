export const MONTH_LABELS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

export const PRODUCT_FILTER = [
    {
        label: 'Все продукты',
        value: 'all',
    },
    {
        label: 'Продукт 1',
        value: 'product1',
    },
    {
        label: 'Продукт 2',
        value: 'product2',
    },
];

export const BAR_OPTIONS = {
    responsive: true,
    plugins: {
        tooltip: {
            callbacks: {
                label: (context) => {
                    return context.dataset.label + ': ' + context.parsed.y + ' кг';
                }
            }
        },
        legend: {
            position: 'bottom',
            labels: {
                generateLabels: (chart) => {
                    const data = chart.data;
                    if (data.labels.length && data.datasets.length) {
                        return data.datasets.map((item) => (
                            {
                                text: item.label,
                                fillStyle: item.backgroundColor,
                                fontColor: item.backgroundColor,
                                lineWidth: 0,
                            }
                        ))
                    }
                    return [];
                },
                font: {
                    size: 16,
                },
            },
            onClick: null,
        },
    },
    scales: {
        y: {
            max: 600000,
            grid: {
                display: false,
            },
            ticks: {
                font: {
                    size: 16,
                },
                callback: (item) => (
                    item / 1000
                )
            },
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                font: {
                    size: 16,
                },
            },
        },
    },
};

export const PIE_OPTIONS = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                generateLabels: (chart) => {
                    const data = chart.data;
                    if (data.labels.length && data.datasets.length) {
                        return data.labels.map((item, index) => (
                            {
                                text: item,
                                fillStyle: data.datasets[0].backgroundColor[index],
                                fontColor: data.datasets[0].backgroundColor[index],
                                lineWidth: 0,
                            }
                        ))
                    }
                    return [];
                },
                font: {
                    size: 16,
                },
            },
            onClick: null,
        },
        tooltip: {
            callbacks: {
                label: (context) => (
                    context.parsed + ' кг'
                )
            }
        }
    }
}
