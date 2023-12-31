'use client';
import { SafeListing, SafeUser } from '@/types';
import { useState } from 'react';
import { deleteListing } from '@/lib/actions/listing.actions';
import { useRouter } from 'next/navigation';
import Heading from '@/components/shared/Heading';
import ListingCard from '@/components/cards/ListingCard';
import toast from 'react-hot-toast';

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
  const [deletingId, setDeletingId] = useState('');
  const router = useRouter();
  const onDelete = async (listingId: string) => {
    setDeletingId(listingId);
    try {
      await deleteListing(listingId);
      toast.success('Listing Deleted');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setDeletingId('');
    }
  };
  return (
    <div className='main-container'>
      <Heading title='My Properties' subtitle='List of your properties' />
      <div className='grid-container'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            currentUser={currentUser}
            actionId={listing.id}
            actionLabel='Delete Property'
            onAction={onDelete}
            disabled={deletingId === listing.id}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertiesClient;
