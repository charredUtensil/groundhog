import { parentPort } from 'node:worker_threads';
import { inferContextDefaults } from "../core/common";
import { CAVERN_TF } from "../core/transformers";
import { SerializedCavern } from '../core/transformers/04_ephemera/05_serialize';
import { GenCompleteInputMessage, GenCompleteOutputMessage } from './gen-complete.types';

parentPort?.on('message', ({requests}: GenCompleteInputMessage) => {
  const results: GenCompleteOutputMessage['results'] = requests.map(({initialContext}) => {
    let state = CAVERN_TF.first({
      initialContext: inferContextDefaults(initialContext),
    });
    try {
      while (state.next) {
        state = state.next();
      }
    
      return {
        initialContext,
        result: (state.result as SerializedCavern).serialized,
      };
    } catch (e) {
      return {
        initialContext,
        error: e instanceof Error ? e.message : `${e}`,
      }
    }
  });
  parentPort?.postMessage({ results } satisfies GenCompleteOutputMessage);
});