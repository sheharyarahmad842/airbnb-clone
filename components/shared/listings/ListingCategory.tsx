'use client';

import { IconType } from 'react-icons';

interface ListingCategoryProps {
  label: string;
  description: string;
  icon: IconType;
}

const ListingCategory = ({
  label,
  description,
  icon: Icon,
}: ListingCategoryProps) => {
  return (
    <div className='flex items-center gap-6'>
      <Icon size={40} className='text-neutral-600' />
      <div className='flex-col-start gap-2'>
        <p className='text-medium-large text-neutral-800'>{label}</p>
        <p className='text-light'>{description}</p>
      </div>
    </div>
  );
};

export default ListingCategory;
