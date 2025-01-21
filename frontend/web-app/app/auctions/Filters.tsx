'use client'

import { useParamsStore } from '@/hooks/useParamsStore';
import { Button, ButtonGroup } from 'flowbite-react';
import React from 'react'
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs';
import { GiFinishLine, GiFlame } from 'react-icons/gi';

const pageSizeButtons = [4, 8, 12];

const orderButtons = [
    {
        label: 'Alphabetical',
        icon: AiOutlineSortAscending,
        value: 'make'
    },
    {
        label: 'Ending soon',
        icon: AiOutlineClockCircle,
        value: 'endingSoon'
    },
    {
        label: 'Recently added',
        icon: BsFillStopCircleFill,
        value: 'new'
    },
]

const filterButtons = [
    {
        label: 'Live auctions',
        icon: GiFlame,
        value: 'live'
    },
    {
        label: 'Ending < 6 hours',
        icon: GiFinishLine,
        value: 'endingSoon'
    },
    {
        label: 'Completed',
        icon: BsStopwatchFill,
        value: 'finished'
    }
]

export default function Filters() {
    const setParams = useParamsStore(state => state.setParams);
    const pageSize = useParamsStore(state => state.pageSize);
    const orderBy = useParamsStore(state => state.orderBy);
    const filterBy = useParamsStore(state => state.filterBy);

    function setPageSize(pageSize: number) {
        setParams({ pageSize });
    }

    function setOrderBy(orderBy: string) {
        setParams({ orderBy })
    }

    function setFilterBy(filterBy: string) {
        setParams({ filterBy })
    }

    return (
        <div className='flex justify-between items-center mb-4'>
            <div>
                <span className='uppercase text-sm items-center text-gray-500 mr-2'>
                    <ButtonGroup>
                        {pageSizeButtons.map((value, i) => (
                            <Button key={i} onClick={() => setPageSize(value)}
                                color={`${pageSize === value ? 'red' : 'gray'}`}>
                                {value}
                            </Button>
                        ))}
                    </ButtonGroup>
                </span>
            </div>

            <div>
                <span className='uppercase text-sm items-center text-gray-500 mr-2'>
                    <ButtonGroup>
                        {orderButtons.map((obj, i) => (
                            <Button key={i} onClick={() => setOrderBy(obj.value)}
                                color={`${orderBy === obj.value ? 'red' : 'gray'}`}>
                                <div className='flex items-center gap-2'>
                                    <obj.icon />
                                    {obj.label}
                                </div>
                            </Button>
                        ))}
                    </ButtonGroup>
                </span>
            </div>

            <div>
                <span className='uppercase text-sm items-center text-gray-500 mr-2'>
                    <ButtonGroup>
                        {filterButtons.map((obj, i) => (
                            <Button key={i} onClick={() => setFilterBy(obj.value)}
                                color={`${filterBy === obj.value ? 'red' : 'gray'}`}>
                                <div className='flex items-center gap-2'>
                                    <obj.icon />
                                    {obj.label}
                                </div>
                            </Button>
                        ))}
                    </ButtonGroup>
                </span>
            </div>
        </div>
    )
}
