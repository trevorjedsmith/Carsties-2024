'use client'

import { Pagination } from 'flowbite-react'
import React from 'react'

interface Props {
    currentPage: number,
    pageCount: number,
    setPageNumber: (pageNumber: number) => void
}
export default function AppPagination({ currentPage, pageCount, setPageNumber }: Props) {
    return (
        <Pagination currentPage={currentPage} onPageChange={e => setPageNumber(e)}
            totalPages={pageCount} layout='pagination'
            showIcons={true} className='text-blue-500 mb-5' />
    )
}
