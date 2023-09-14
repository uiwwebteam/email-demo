import React, { useEffect, useState } from 'react';
import { Card } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';

const HomePage = ({ data: { getEthosQuery } }) => {
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState(null); // Initialize person as null

    useEffect(() => {
        (async () => {
            setLoading(true);

            // Retrieve data from localStorage
            const cachedData = localStorage.getItem('schoolEmail');

            if (cachedData) {
                setLoading(false);
                setPerson(() => JSON.parse(cachedData));
            } else {
                try {
                    const personsData = await getEthosQuery({ queryId: 'list-persons' });
                    const { data: { persons: { edges: personEdges } = [] } = {} } = personsData;
                    const person = personEdges[0]?.node; // Use optional chaining
                    setPerson(() => person);

                    // Store data in localStorage
                    localStorage.setItem('schoolEmail', JSON.stringify(person));

                    setLoading(false);
                } catch (error) {
                    console.error('ethosQuery failed', error);
                    // Handle the error as needed
                }
            }
        })();
    }, [getEthosQuery]);

    return (
        <Card title="Home Page">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Email Page</h2>
                    <p>Email: {person?.emails[0]?.address}</p>
                </div>
            )}
        </Card>
    );
};

HomePage.propTypes = {
    data: PropTypes.shape({
        getEthosQuery: PropTypes.func.isRequired,
    }).isRequired,
};

export default HomePage;
