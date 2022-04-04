const Run = require("run-sdk");
const purseKey = "";
const ownerKey = "";
const classLocation = "";

const main = async () => {
  let _run = new Run({
    trust: "*",
    purse: purseKey,
    owner: ownerKey,
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
    purse: purseKey,
    owner: ownerKey,
  });
  await _run.sync();
  let JigClass = await _run.load(classLocation);
  let jig = new JigClass("Message", "sig", "signer");
  await jig.sync();
};

second();
