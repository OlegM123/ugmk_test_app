export const getDataGroupedByMonth = (month, data, filter) => {
    
    if (data) {
        if (filter === 'all') {
            return [
                data.filter(item => item?.date?.split('/')[1] === String(month)).reduce((acc, item) => acc += item.product1 + item.product2 + item.product3, 0)
            ];
        };
        return [
            data.filter(item => item?.date?.split('/')[1] === String(month)).reduce((acc, item) => acc += item[filter], 0)
        ];
    };
};

export const getPieChartData = (month, factory, data) => {
    if (month && factory && data)
        return [
            getDataGroupedByMonth(month, getProductsGroupedByFactory(data, factory), 'product1'),
            getDataGroupedByMonth(month, getProductsGroupedByFactory(data, factory), 'product2')
        ]
}

export const getProductsGroupedByFactory = (data, factory) => data.filter(item => item.factory_id === Number(factory));