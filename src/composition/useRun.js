let Run = window.Run;
let BSV = window.bsv;
let Message = window.bsvMessage;
let Mnemonic = window.bsvMnemonic;
import { useStore } from "vuex";
let payPath = "m/44'/236'/0'/1/0";
let dpath = "m/44'/236'/0'/2/0";
export function useRun() {
  let run = null;
  let store = useStore();

  const loginWithSeed = (_seed) => {
    let _run = null;
    let mnemonic = null;
    if (_seed === "") {
      mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
      _seed = mnemonic.toString();
    } else {
      mnemonic = Mnemonic.fromString(_seed);
    }
    const hdPrivKey = BSV.HDPrivateKey.fromSeed(mnemonic.toSeed());
    const payKey = hdPrivKey.deriveChild(payPath);
    const ownerKey = hdPrivKey.deriveChild(dpath);
    const payPubKey = payKey.publicKey;
    const ownerPubKey = ownerKey.publicKey;
    const ownerAddress = ownerPubKey.toAddress();
    const payAddress = payPubKey.toAddress();
    console.log(
      payKey.privateKey.toString(),
      payAddress.toString(),
      ownerKey.privateKey.toString(),
      ownerAddress.toString()
    );
    _run = new Run({
      trust: "*",
      purse: payKey.privateKey.toString(),
      owner: ownerKey.privateKey.toString(),
    });
    store.dispatch(
      "login",
      _seed,
      payKey.privateKey.toString(),
      payAddress.toString(),
      ownerKey.privateKey.toString(),
      ownerAddress.toString()
    );
    console.log(_run.purse.address);
    run = _run;
    return run;
  };

  const setupAnonAccount = () => {
    let mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
    console.log(mnemonic.toSeed());
    let messageToSave = "Aribatrary Message";
    run = new Run({});
    let purseAddress = run.purse.address;
    console.log({ purseAddress });
    let signKey = BSV.PrivateKey.fromString(run.purse.privateKey.toString());
    let signedMessage = Message.sign(messageToSave, signKey);
    console.log({ signedMessage });
  };

  const lock = async (message) => {
    // let LockClass = await run.load("lock class location");
    // let post = new Lock(message);
    // await post.sync();
    return message;
  };

  return { run, loginWithSeed, lock, setupAnonAccount };
}
