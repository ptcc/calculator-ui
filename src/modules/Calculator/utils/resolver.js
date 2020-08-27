// @flow
type Resolver = {
  calculate: (string) => Promise<string | { error: string }>,
};

export type { Resolver };
