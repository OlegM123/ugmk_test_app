import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPieChartData } from "../utils/helpers";
import { getProductsFromApi } from "../utils/api";
import { PIE_OPTIONS } from "../utils/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

const DetailsPage = () => {

    const location = useLocation();
    const [factoryNumber, monthNumber] = [location.pathname.split('/')[2], location.pathname.split('/')[3]];
    const { factory, month } = location.state
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        getProductsFromApi().then(res => setGraphData(getPieChartData(monthNumber, factoryNumber, res)));
    }, [setGraphData, getProductsFromApi])

    const data = {
        labels: [
            'Продукт 1',
            'Продукт 2'
        ],
        datasets: [{
            data: graphData,
            backgroundColor: ['Green', 'Orange']
        }]
    }

    return (
        <Wrapper>
            <PieHeader>
                Статистика по продукции фабрики {factory[factory.length - 1]} за {month}
            </PieHeader>
            <Pie data={data} options={PIE_OPTIONS} />
        </Wrapper>
    );
};

export default DetailsPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    margin: 0 auto;
    height: 100vh;
`

const PieHeader = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 50px;
`