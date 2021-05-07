import { transport } from './explorer';
import {Block, InternalTransaction, RPCStakingTransactionHarmony, RPCTransactionHarmony, RelatedTransaction} from "src/types";

export function getBlockByNumber(params: any[]) {
  return transport('getBlockByNumber', params) as Promise<Block>;
}

export function getBlockByHash(params: any[]) {
  return transport('getBlockByHash', params) as Promise<Block>;
}

export function getBlocks(params: any[]) {
  return transport('getBlocks', params) as Promise<Block[]>;
}

export function getCount(params: any[]) {
  return transport('getCount', params) as Promise<{ count: string }>;
}

export function getTransactions(params: any[]) {
  return transport('getTransactions', params) as Promise<RPCTransactionHarmony[]>;
}

// TODO почему RPCStakingTransactionHarmony в обычной транзакции
export function getTransactionByField(params: any[]) {
  return transport('getTransactionByField', params) as Promise<RPCStakingTransactionHarmony>;
}

export function getStakingTransactionByField(params: any[]) {
  return transport('getStakingTransactionsByField', params) as Promise<RPCStakingTransactionHarmony>;
}

export function getInternalTransactionsByField(params: any[]) {
  return transport('getInternalTransactionsByField', params) as Promise<InternalTransaction[]>;
}

export function getTransactionLogsByField(params: any[]) {
  return transport('getLogsByField', params) as Promise<any>;
}

export function getRelatedTransactions(params: any[]) {
  return transport('getRelatedTransactions', params) as Promise<RelatedTransaction[]>;
}