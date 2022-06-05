
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Advertiser {
    id: number;
    originId: string;
    name: string;
    campaigns?: Nullable<Nullable<Campaign>[]>;
}

export interface Campaign {
    id: number;
    originId: number;
    name: string;
    friendlyName: string;
    contractStart?: Nullable<string>;
    contractEnd?: Nullable<string>;
    spendRate: number;
    spendType: string;
    type: string;
    advertiserId: number;
}

export interface IQuery {
    advertiser(originId: string): Nullable<Advertiser> | Promise<Nullable<Advertiser>>;
}

type Nullable<T> = T | null;
