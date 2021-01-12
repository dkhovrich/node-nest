import { resolve } from 'dns';

const enum ResultType {
  Success = 'Success',
  Error = 'Error'
}

export type ResultSuccess<T> = {
  type: ResultType.Success;
  value: T;
};

export type ResultError = {
  type: ResultType.Error;
  error: Error;
};

export type Result<T> = ResultSuccess<T> | ResultError;

export function isResultSuccess<T>(
  result: Result<T>
): result is ResultSuccess<T> {
  return result.type === ResultType.Success;
}

export function isResultError(result: Result<unknown>): result is ResultError {
  return result.type === ResultType.Error;
}

export function createResultSuccess<T>(value: T): ResultSuccess<T> {
  return { type: ResultType.Success, value };
}

export function createResultError(error: Error): ResultError {
  return { type: ResultType.Error, error };
}
