export type OptionalPropertiesOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;

export type OptionalObjectOf<T extends object> = {
  [K in OptionalPropertiesOf<T>]: Exclude<T[K], undefined>;
};

export function mergeOptionals<T extends object>(
  optionals: T,
  defaultOptions: OptionalObjectOf<T>
) {
  return { ...defaultOptions, ...optionals } as Required<T>;
}

export async function asyncSleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
