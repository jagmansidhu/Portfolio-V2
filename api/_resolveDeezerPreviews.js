/**
 * Resolve fresh Deezer 30s preview URLs for track IDs.
 * Signed CDN URLs expire quickly; always fetch at request time.
 */

async function fetchTrackPreview(id) {
  const res = await fetch(`https://api.deezer.com/track/${id}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return typeof data?.preview === 'string' && data.preview ? data.preview : null;
}

/**
 * @param {Array<number|string>} ids
 * @returns {Promise<(string|null)[]>}
 */
export async function resolveDeezerPreviews(ids) {
  return Promise.all(
    ids.map(async (id) => {
      const n = Number(id);
      if (!Number.isFinite(n) || n <= 0) return null;
      try {
        return await fetchTrackPreview(n);
      } catch {
        return null;
      }
    })
  );
}
