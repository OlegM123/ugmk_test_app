import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { MONTH_LABELS, PRODUCT_FILTER, BAR_OPTIONS } from "../utils/constants"
import { getProductsFromApi } from "../utils/api";
import { getDataGroupedByMonth } from "../utils/helpers";
import BarChart from "../components/BarChart";

const HomePage = () => {

    const [dataFromApi, setDataFromApi] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams({ value: 'all' });
    const [currentFilter, setCurrentFilter] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getProductsFromApi().then(res => setDataFromApi(res));
    }, [])

    useEffect(() => {
        setCurrentFilter(searchParams.get('value'))
    }, [searchParams])

    useEffect(() => {
        setGraphData({
            labels: MONTH_LABELS,
            datasets: getChartData(MONTH_LABELS),
        });
    }, [currentFilter, dataFromApi]);

    const getProductsGroupedByFactory = (factory) => {
        return dataFromApi?.filter(item => item.factory_id === Number(factory))
    }

    const onFilterChange = (value) => {
        setSearchParams({ value });
    }

    const getChartData = (labels) => {
        return [
            {
                label: 'Фабрика А',
                data: labels.map((item, index) => getDataGroupedByMonth(index + 1, getProductsGroupedByFactory(1), currentFilter)),
                backgroundColor: 'Red',
            },
            {
                label: 'Фабрика Б',
                data: labels.map((item, index) => getDataGroupedByMonth(index + 1, getProductsGroupedByFactory(2), currentFilter)),
                backgroundColor: 'Blue',
            }
        ]
    }

    const onChartBarClick = (event, elements) => {
        elements.length && navigate(
            `/details/${elements[0].datasetIndex + 1}/${elements[0].index + 1}`, {
            state: {
                factory: graphData.datasets[elements[0].datasetIndex].label,
                month: MONTH_LABELS[elements[0].index]
            }
        })
    }

    const scales = {
        ...BAR_OPTIONS.scales,
        y: {
            ...BAR_OPTIONS.scales.y, max: (currentFilter === 'all' ? 600000 : undefined)
        }
    }

    return (
        <StyledContainer>
            <Wrapper>
                <FilterContainer>
                    Фильтр по типу продукции
                    <select onChange={(e) => onFilterChange(e.target.value)} value={currentFilter}>
                        {PRODUCT_FILTER.map((item) => <option
                            value={item.value}
                            key={item.value}
                        >
                            {item.label}
                        </option>)}
                    </select>
                </FilterContainer>
                <BarChart
                    graphData={graphData}
                    options={{
                        ...BAR_OPTIONS,
                        scales,
                        onClick: onChartBarClick,
                    }}
                />
            </Wrapper>
        </StyledContainer>
    )
};

export default HomePage;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  `

const Wrapper = styled.div`
    width: 80%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    gap: 25px;
`

const FilterContainer = styled.div`
    display: flex;
    border: 2px darkgrey solid;
    border-radius: 15px;
    padding: 10px 40px;
    justify-content: right;
    gap: 20px;
`