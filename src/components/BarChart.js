import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const BarChart = ({ graphData, options }) => (
    <BarWrapper>
        {graphData && (
            <Bar
                data={graphData}
                options={options}
            />
        )}
    </BarWrapper>
);

export default BarChart;

const BarWrapper = styled.div`
    display: flex;
    border: 2px darkgrey solid;
    border-radius: 15px;
    justify-content: right;
    gap: 20px;
    padding: 20px 40px;
`
