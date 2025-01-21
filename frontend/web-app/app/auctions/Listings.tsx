'use client'

import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard';
import { Auction, PagedResult } from '@/types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';
import { useParamsStore } from '@/hooks/useParamsStore';
import { useShallow } from 'zustand/shallow';
import qs from 'query-string';
import EmptyFilter from '../components/EmptyFilter';

export default function Listings() {
    // props
    const [data, setData] = useState<PagedResult<Auction>>();
    // expose just needed properties by using useShallow hook
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy
    })));

    // expose setParams method from store
    const setParams = useParamsStore(state => state.setParams);

    // create a dynamic querystring from qs
    const url = qs.stringifyUrl({ url: '', query: params });

    // set page number is just a wrapper around setParams from store
    function setPageNumber(pageNumber: number) {
        setParams({ pageNumber });
    }

    // hooks/mounts
    useEffect(() => {
        getData(url).then(data => {
            setData(data);
        })
    }, [url]);

    if (!data) return <h3>Loading...</h3>

    return (
        <>
            <Filters />
            {data.totalCount == 0 ? (<EmptyFilter showReset />) : (
                <>
                    <div className='grid grid-cols-4 gap-6'>
                        {data.results.map((auction: Auction) => (
                            <AuctionCard key={auction.id} auction={auction} />
                        ))}
                    </div>
                    <div className='flex justify-center'>
                        <AppPagination setPageNumber={setPageNumber} currentPage={params.pageNumber}
                            pageCount={data.pageCount} />
                    </div>
                </>
            )}
        </>
    )
}
