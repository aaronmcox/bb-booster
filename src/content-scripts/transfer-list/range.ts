
export interface Range {
  minimum: string,
  maximum: string
}

export function range(minimum: string, maximum: string): Range {
  return {
    minimum,
    maximum
  };
}
