import React, {useState} from 'react';
import {server} from "../../lib/api"
import {ListingsData, DeleteListingVariables, DeleteListingData, Listing} from './types';

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

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {

  const [listings, setListings] = useState<Listing[] | null>(null);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });

      setListings(data.listings);

      console.log("fetchListings", data); // check the console to see the listings data from our GraphQL Request!
    };


    const deleteListing = async () => {
      const { data } = await server.fetch<DeleteListingData,DeleteListingVariables>
        ({
        query: DELETE_LISTING,
        variables: {
          id: "608612e131b6af723a3f004a" // hardcoded id variable,
        }
      });

    console.log("deleteListing", data); // check the console to see the result of the mutation!
    };


    const listListings = listings ?
    <ul>
    {listings.map((listing) => {
      return <li key={listing.id}>{listing.title}</li>
    })}
    </ul> : null;


    return (
      <div>
        <h2>{title}</h2>
        {listListings}
        <button onClick={fetchListings}>Query Listings!</button>
        <button onClick={deleteListing}>Delete a listing!</button>
      </div>
    );

}



