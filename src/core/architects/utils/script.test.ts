import goldenTest from "../../test_utils/golden";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";
import { mkScriptBuilder, mkVars, sanitizeString } from "./script";

describe("escapeString", () => {
  it("handles the empty string", () => {
    expect(sanitizeString("")).toBe("");
  });
  it("handles a normal string", () => {
    expect(sanitizeString("A landslide has occurred!")).toBe(
      "A landslide has occurred!",
    );
  });
  it("removes quotes", () => {
    expect(sanitizeString('An "Energy Crystal" has been found!')).toBe(
      "An Energy Crystal has been found!",
    );
  });
  it("removes backslashes", () => {
    expect(sanitizeString("\\n\\n\\n\\")).toBe("nnn");
  });
  it("removes newlines", () => {
    expect(sanitizeString("one\ntwo\n  three  \n  \n  \n  four")).toBe(
      "one two three four",
    );
  });
});

describe("ScriptBuilder", () => {
  const cavern = {} as PreprogrammedCavern;

  it("declares variables", () => {
    const sb = mkScriptBuilder(cavern);
    sb.declareArrow("arw");
    sb.declareBuilding("bld");
    sb.declareCreature("cr");
    sb.declareInt("num", 42);
    sb.declareString("str", "Message!");
    expect(sb.build()).toEqual(`\
arrow arw
building bld
creature cr
int num=42
string str="Message!"`);
  });

  it("declares an event", () => {
    const sb = mkScriptBuilder(cavern);
    sb.event("foo", "crystals+=1;");
    expect(sb.build()).toEqual(`\
foo::;
crystals+=1;
`);
  });

  it("declares a simple if trigger", () => {
    const sb = mkScriptBuilder(cavern);
    sb.if("crystals>10", "crystals-=5;");
    expect(sb.build()).toEqual("if(crystals>10)[crystals-=5]");
  });

  it("declares a simple when trigger", () => {
    const sb = mkScriptBuilder(cavern);
    sb.when("crystals>50", "crystals-=1;");
    expect(sb.build()).toEqual("when(crystals>50)[crystals-=1]");
  });

  it("creates an anonymous event chain to handle multiple statements", () => {
    const sb = mkScriptBuilder(cavern);
    sb.if("crystals>10", "wait:5;", "crystals-=5;");
    expect(sb.build()).toEqual(`\
if(crystals>10)[t0]
t0::;
wait:5;
crystals-=5;
`);
  });

  it("creates an anonymous event chain to handle repeated triggers", () => {
    const sb = mkScriptBuilder(cavern);
    sb.when("ore>50", "ore-=20;");
    sb.when("ore>50", "crystals+=1;");
    expect(sb.build()).toEqual(`\
when(ore>50)[tw0]
tw0::;
ore-=20;
crystals+=1;
`);
  });

  it("creates anonymous event chains to handle repeated triggers with multiple statements", () => {
    const sb = mkScriptBuilder(cavern);
    sb.when("ore>50", "ore-=20;");
    sb.when("ore>50", "wait:5;", "crystals+=1;");
    sb.when("ore>50", "wait:10;", "crystals+=1;");
    expect(sb.build()).toEqual(`\
when(ore>50)[tw2]
tw2::;
ore-=20;
t0;
t1;

t0::;
wait:5;
crystals+=1;

t1::;
wait:10;
crystals+=1;
`);
  });

  it("handles if and when triggers on the same condition 1", () => {
    const sb = mkScriptBuilder(cavern);
    sb.if("ore>50", "msg:msgFirstAlchemy;");
    sb.when("ore>50", "ore-=20;", "wait:5;", "crystals+=1;");
    expect(sb.build()).toEqual(`\
int tf0=0
if(tf0>0)[msg:msgFirstAlchemy]
when(ore>50)[tw2]
tw2::;
tf0=1;
t1;

t1::;
ore-=20;
wait:5;
crystals+=1;
`);
  });

  it("handles if and when triggers on the same condition 2", () => {
    const sb = mkScriptBuilder(cavern);
    sb.if("ore>50", "shake:1;", "msg:msgFirstAlchemy;");
    sb.when("ore>50", "ore-=20;");
    expect(sb.build()).toEqual(`\
int tf0=0
if(tf0>0)[t1]
t1::;
shake:1;
msg:msgFirstAlchemy;

when(ore>50)[tw2]
tw2::;
tf0=1;
ore-=20;
`);
  });

  goldenTest("fizzbuzz", () => {
    // This code is bad but idk - it's more about testing the builder.

    const sb = mkScriptBuilder(cavern);
    const v = mkVars("fbz", [
      "n",
      "lock",
      "m",
      "three",
      "five",
      "msgFizz",
      "msgBuzz",
      "msgFizzBuzz",
    ]);
    sb.declareInt(v.n, 0);
    sb.declareInt(v.m, 0);
    sb.declareInt(v.lock, 0);
    sb.declareInt(v.three, 0);
    sb.declareInt(v.five, 0);

    sb.when("enter:1,1", `${v.lock}+=1;`);
    sb.when(
      `${v.lock}==1`,

      `pan:${v.three},${v.five};`,

      `${v.n}+=1;`,
      `${v.m}=0;`,

      `${v.three}+=1;`,
      `((${v.three}==3))${v.m}=1;`,
      `((${v.three}>=3))${v.three}-=3;`,

      `${v.five}+=1;`,
      `((${v.five}==5))${v.m}+=2;`,
      `((${v.five}>=5))${v.five}-=5;`,

      `((${v.m}==1))msg:${sb.declareString(v.msgFizz, "Fizz")};`,
      `((${v.m}==2))msg:${sb.declareString(v.msgBuzz, "Buzz")};`,
      `((${v.m}==3))msg:${sb.declareString(v.msgFizzBuzz, "Fizz Buzz")};`,

      `${v.lock}=0;`,
    );
    return sb.build();
  });
});
