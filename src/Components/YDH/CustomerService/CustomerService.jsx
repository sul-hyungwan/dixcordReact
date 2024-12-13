import React from 'react';
import styled from 'styled-components';
import CustomerServiceSearch from './CustomerServiceSearch';
import CustomerServiceHelp from './CustomerServiceHelp';

const Area = styled.div`

`;

function CustomerService(props) {
    return (
        <Area>
            <CustomerServiceSearch/>
            <CustomerServiceHelp/>
        </Area>
    );
}

export default CustomerService;