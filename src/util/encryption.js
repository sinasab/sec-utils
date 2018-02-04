import triplesec from "triplesec";

function arrayBufferToTriplesecBuffer(b) {
  return new triplesec.Buffer(new Uint8Array(b));
}
function triplesecBufferToArrayBuffer(b) {
  var ret = new ArrayBuffer(b.length);
  var view = new Uint8Array(ret);
  for (var i = 0; i < b.length; i++) {
    view[i] = b.readUInt8(i);
  }
  return ret;
}
export function encrypt(clearText, key, progressHook) {
  return new Promise(resolve => {
    triplesec.encrypt(
      {
        data: arrayBufferToTriplesecBuffer(clearText),
        key: new triplesec.Buffer(key),
        progress_hook: progressHook
      },
      (error, result) => resolve(triplesecBufferToArrayBuffer(result))
    );
  });
}
export function decrypt(encryptedHex, key, progressHook) {
  return new Promise(resolve => {
    triplesec.decrypt(
      {
        data: arrayBufferToTriplesecBuffer(encryptedHex),
        key: new triplesec.Buffer(key),
        progress_hook: progressHook
      },
      (error, result) => resolve(triplesecBufferToArrayBuffer(result))
    );
  });
}
export function downloadAsFile(data, filename) {
  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(new Blob([data]));
  a.download = filename;
  a.click();
}
const encryptionSteps = [
  "pbkdf2 (pass 1)",
  "scrypt",
  "pbkdf2 (pass 2)",
  "salsa20",
  "twofish",
  "aes",
  "HMAC-SHA512-SHA3"
];
export const estimateEncryptionProgress = estimateProgressFactory(
  encryptionSteps
);
const decryptionSteps = [
  "pbkdf2 (pass 1)",
  "scrypt",
  "pbkdf2 (pass 2)",
  "aes",
  "twofish",
  "salsa20"
];
export const estimateDecryptionProgress = estimateProgressFactory(
  decryptionSteps
);
function estimateProgressFactory(steps) {
  return function(progressObj) {
    const numSteps = steps.length;
    const {
      i: iterations,
      total: totalIterations,
      what: stepName
    } = progressObj;
    const stepNumber = steps.indexOf(stepName);
    const currentStepProgress = iterations / totalIterations;
    const otherStepsProgress = stepNumber / numSteps;
    const progress = otherStepsProgress + currentStepProgress / numSteps;
    console.log(progress);
    return progress;
  };
}
