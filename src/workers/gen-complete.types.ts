import { PartialCavernContext } from "../core/common/context"

export type GenCompleteInputMessage = {
  readonly requests: readonly {
    readonly initialContext: PartialCavernContext;
  }[];
}

export type GenCompleteOutputMessage = {
  readonly results: readonly {
    readonly initialContext: PartialCavernContext;
    readonly error?: string;
    readonly result?: string;
  }[];
}