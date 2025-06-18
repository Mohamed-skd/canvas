export function logInfo(message) {
  console.log(`ℹ️ ${message} ℹ️`);
}
export function logSuccess(message) {
  console.log(`✅ ${message} ✅`);
}
export function logError(message) {
  console.log(`❌ ${message} ❌`);
}
export function errorLog(error) {
  logError("Oups ! An error occured 😔");
  console.error(error);
  return false;
}
