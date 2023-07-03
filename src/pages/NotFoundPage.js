import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const NotFoundPage = () => {

    const error = useRouteError();

    return (
        <PageContainer>
            <Message>Упс! Ошибка...</Message>
            <Status>{error.status}</Status>
            <Message>{error.data}</Message>
        </PageContainer>
    );
};

export default NotFoundPage;

const PageContainer = styled.div`
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
    white-space: nowrap;
`

const Status = styled.div`
    font-size: 72px;
`

const Message = styled.div`
    font-size: 48px;
`