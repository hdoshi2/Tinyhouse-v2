import React, {useState, useEffect} from 'react';
import {server, useQuery, useMutation} from "../../lib/api"
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

  const [deleteListing, {
    loading: deleteListingLoading,
    error: deleteListingError}] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING)

  // const [listings, setListings] = useState<Listing[] | null>(null);
  const listings = data ? data.listings : null;



  const handleDeleteListing = async (id: string) => {
    // await server.fetch<DeleteListingData,DeleteListingVariables>
    //   ({
    //   query: DELETE_LISTING,
    //   variables: {
    //     id
    //   }
    // });

    await deleteListing({id})

    refetch();

  };


  const listListings = listings ?
    <ul>
    {listings.map((listing) => {
      return <li key={listing.id}>{listing.title}
        <button onClick={() => handleDeleteListing(listing.id)}>
          Delete
        </button>
      </li>
    })}
    </ul> : null;

    if(loading)
      return <div>Loading...</div>;

    if(error)
      return <div>Something went wrong!</div>;

    const deleteListingLoadingMessage = deleteListingLoading ? <h4>Deletion in Progress...</h4> : null;
    const deleteListingErrorMessage = deleteListingError ? <h4>Uh Oh! Deletion Error.</h4> : null;

    return (
      <div>
        <h2>{title}</h2>
        {listListings}
        {deleteListingLoadingMessage}
        {deleteListingErrorMessage}
      </div>
    );

}



