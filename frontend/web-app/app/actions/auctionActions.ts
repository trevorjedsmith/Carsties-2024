'use server'

import { auth } from "@/auth";
import { Auction, PagedResult } from "@/types";

export async function getData(url: string): Promise<PagedResult<Auction>> {
    console.log('Url querystring: ' + url);
    const res = await fetch(`http://localhost:6001/search${url}`);
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export async function updateAuctionTest() {
    const session = await auth();
    const data = {
        mileage: Math.floor(Math.random() * 1000) + 1
    }
    const res = await fetch('http://localhost:6001/auctions/bbab4d5a-8565-48b1-9450-5ac2a5c4a654', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) return { status: res.status, message: res.statusText }
    return res.statusText;
}