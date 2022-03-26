const Run = require("run-sdk");

const main = async () => {
  let _run = new Run({
    trust: "*",
    purse: "KwZw2apQ2HJnTbnN6f26YzmYhU9KEmiCrb7HaVDi2MFnXLq6aH38",
    owner: "L2vg4igrv21c9H8LYkbZYj2XHmmYw8wMxyFni4pVM6ADtykxEbUL",
  });
  await _run.sync();
  class VXLockTEST extends Run.Jig {
    init(message, signature, signer) {
      this.message = message;
      this.signature = signature;
      this.signer = signer;
    }
  }

  let tx = new Run.Transaction();
  tx.update(() => {
    _run.deploy(VXLockTEST);
  });
  let txid = await tx.publish();
  console.log(txid);
};

const second = async () => {
  let _run = new Run({
    trust: "*",
    purse: "KwZw2apQ2HJnTbnN6f26YzmYhU9KEmiCrb7HaVDi2MFnXLq6aH38",
    owner: "L2vg4igrv21c9H8LYkbZYj2XHmmYw8wMxyFni4pVM6ADtykxEbUL",
  });
  await _run.sync();
  const classLocation =
    //"5b11de644722fdc47f7ac773d3455b6b260a98416935940940b5bb650c0a8fd6_o1";
    "a6fbd56e08319384853f8df664a0648343080a2efdf7d1d317957636e63842c3_o1";
  let JigClass = await _run.load(classLocation);
  let jig = new JigClass("Message", "sig", "signer");
  await jig.sync();
};

second();
