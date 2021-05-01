import React from 'react';
import {server} from "../../lib/api"

const LISTINGS = `
query Listings{
    listings{
        id
        title
        image
        address
        price
        numOfGuests
        numOfBeds
        rating
    }
}`;

interface Props {
    title: String;
}


export const Listings = ({title}: Props) => {
    const fetchListings = async () => {
        const listings = await server.fetch({query: LISTINGS});
        console.log(listings.data.listings);
    }

    return <div>
            <h2>{title}</h2>
            <button onClick={fetchListings}>Query Listings!</button>
        </div>
}

