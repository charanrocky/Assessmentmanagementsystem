type AnyObj = Record<string, any>;

function tryParseNumber(s: string) {
  const n = Number(s);
  return Number.isNaN(n) ? s : n;
}

export function resolvePath(obj: AnyObj, path: string): any {
  if (!path) return undefined;
  const parts = path.split(".").map((p) => p.trim());

  let current: any = obj;
  for (const part of parts) {
    if (current == null) return undefined;

    const filterMatch = part.match(/^([^\[]+)\[\?\(@\.([^\]=]+)==(.+)\)\]$/);
    if (filterMatch) {
      const prop = filterMatch[1];
      const key = filterMatch[2];
      let rawVal = filterMatch[3].replace(/^['"]|['"]$/g, "");
      const val = tryParseNumber(rawVal);
      const arr = current[prop];
      if (!Array.isArray(arr)) return undefined;
      current = arr.find((el) => String(el?.[key]) === String(val));
      continue;
    }

    const indexMatch = part.match(/^([^\[]+)\[(\d+)\]$/);
    if (indexMatch) {
      const prop = indexMatch[1];
      const idx = Number(indexMatch[2]);
      const arr = current[prop];
      if (!Array.isArray(arr)) return undefined;
      current = arr[idx];
      continue;
    }

    current = current[part];
  }

  return current;
}
