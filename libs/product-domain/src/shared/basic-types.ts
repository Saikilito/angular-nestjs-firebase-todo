export type Literal = boolean | null | number | string;

export type JSONValue = Literal | { [key: string]: JSONValue } | JSONValue[];
