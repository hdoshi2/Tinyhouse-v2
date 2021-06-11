import React, {useState, useEffect} from 'react';
import {server, useQuery} from "../../lib/api"
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

  const {data, loading, refetch, error} = useQuery<ListingsData>(LISTINGS);

  // const [listings, setListings] = useState<Listing[] | null>(null);
  const listings = data ? data.listings : null;



  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData,DeleteListingVariables>
      ({
      query: DELETE_LISTING,
      variables: {
        id
      }
    });

    refetch();

  };


  const listListings = listings ?
    <ul>
    {listings.map((listing) => {
      return <li key={listing.id}>{listing.title}
        <button onClick={() => deleteListing(listing.id)}>
          Delete
        </button>
      </li>
    })}
    </ul> : null;

    if(loading)
      return <div>Loading...</div>;

    if(error)
      return <div>Something went wrong!</div>;
      
    return (
      <div>
        <h2>{title}</h2>
        {listListings}
      </div>
    );

}



