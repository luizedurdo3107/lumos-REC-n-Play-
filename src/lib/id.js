let sequence = 0;
// Identificadores locais de interface, sem função de autenticação ou resgate.
// O fallback permite o uso do estande por HTTP na rede local.
export function createId(prefix = "item", cryptoProvider = globalThis.crypto) {
  const uuid = cryptoProvider?.randomUUID?.();
  if (uuid) return `${prefix}-${uuid}`;
  sequence += 1;
  return `${prefix}-${Date.now().toString(36)}-${sequence.toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
