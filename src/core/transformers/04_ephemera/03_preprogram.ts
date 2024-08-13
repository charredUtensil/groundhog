import { EnscribedCavern } from "./02_enscribe";

export type PreprogrammedCavern = EnscribedCavern & {
  
};

export default function preprogram(cavern: EnscribedCavern): PreprogrammedCavern {
  return {...cavern};
}