module.exports = {
    name: 'Email Demo',
    publisher: 'Unveristy of the Incarnate Word',
    cards: [{
        type: 'EmailDemoCard',
        source: './src/cards/EmailDemoCard',
        title: 'Email Demo Card',
        displayCardType: 'Email Demo Card',
        description: 'This is a demo',
        // pageRoute: {
        //     route: '/',
        // },
        queries: {
            'list-persons': [
                {
                    resourceVersions: {
                        persons: { min: 12 }
                    },
                    query:
                        `query listPerson($personId: ID){
                            persons: {persons} (
                                filter: {id: {EQ: $personId}}
                                ) 
                                {
                                    edges {
                                        node {
                                            id
                                            gender
                                                dateOfBirth
                                                    credentials {
                                                        type
                                                        value
                                                                }
                                                names {
                                                    firstName
                                                    lastName
                                                    middleName
                                                    preference
                                                    fullName
                                                }
                                                emails {
                                                    type {
                                                        emailType
                                                    }
                                                    address
                                                    preference
                                                }
                                        }
                                    }
                                }
                        }`
                }
            ]
        }
    }
    ],
    page: {
        source: './src/page/router.jsx'
    }
};