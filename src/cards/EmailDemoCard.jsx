import React, { useEffect, useState } from 'react';
import {
    // Card,
    Button,
    Typography
    // Table,
    // TableHead,
    // TableRow,
    // TableCell,
    // TableBody
} from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
// import { useHistory } from 'react-router-dom';

const cacheKey = 'graphql-card:persons';

const EmailDemoCard = (props) => {
    const {
        cardControl: { setLoadingStatus, setErrorMessage, navigateToPage }, // Use navigateToPage
        data: { getEthosQuery },
        cache: { getItem, storeItem },
    } = props;

    const [persons, setPersons] = useState([]);

    const handleButtonClick = (preferredName, schoolEmail) => {
        const encodedEmail = encodeURIComponent(schoolEmail);
        navigateToPage(`/home/${encodedEmail}`);
    };

    useEffect(() => {
        setLoadingStatus(true);

        const fetchData = async () => {
            const { data: cachedData, expired: cachedDataExpired = true } = await getItem({ key: cacheKey });
            if (cachedData) {
                setLoadingStatus(false);
                setPersons(() => cachedData);
            }
            if (cachedDataExpired || cachedData === undefined) {
                try {
                    const personsData = await getEthosQuery({ queryId: 'list-persons' });
                    const { data: { persons: { edges: personEdges } = [] } = {} } = personsData;
                    const persons = personEdges.map(edge => edge.node);
                    setPersons(() => persons);
                    storeItem({ key: cacheKey, data: persons });
                    setLoadingStatus(false);
                } catch (error) {
                    console.error('ethosQuery failed', error);
                    setErrorMessage({
                        headerMessage: useIntl.formatMessage({ id: 'PersonInformationCard-fetchFailed' }),
                        textMessage: useIntl.formatMessage({ id: 'PersonInformationCard-personsFetchFailed' }),
                        iconName: 'error',
                        iconColor: '#D42828'
                    });
                }
            }
        };

        fetchData();
    }, [setLoadingStatus, setErrorMessage, getItem, storeItem, getEthosQuery]);

    // const renderPersonsList = () => {
    return (
        <ul>
            {persons.map((person) => (
                <Typography key={person.id}>
                    {/* Add a conditional check for school email */}
                    {person.emails.some((email) => email.type.emailType === 'school') && (
                        <Button onClick={() => handleButtonClick(person.preferredName, person.emails.find((email) => email.type.emailType === 'school').address)}>
                            View Email
                        </Button>
                    )}
                </Typography>
            ))}
        </ul>
    );
};

// return (
//     <Card title="Person List">
//         {renderPersonsList()}
//     </Card>
// );
// };

EmailDemoCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.shape({
        setLoadingStatus: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
        navigateToPage: PropTypes.func.isRequired, // Add navigateToPage
    }).isRequired,
    data: PropTypes.shape({
        getEthosQuery: PropTypes.func.isRequired,
    }).isRequired,
    cache: PropTypes.shape({
        getItem: PropTypes.func.isRequired,
        storeItem: PropTypes.func.isRequired,
    }).isRequired,
};


export default EmailDemoCard;
