
/**
 * Convert an array of publication objects to a CSV string.
 * Expects each publication to contain title, authors, year, publication, doi, url.
 */
export function publicationsToCSV(publications: any[]): string {
  const headers = ['Title', 'Authors', 'Year', 'Publication', 'DOI', 'URL'];
  const escape = (val: any) =>
    typeof val === 'string'
      ? `"${val.replace(/"/g, '""').replace(/\n/g, ' ')}"`
      : val ?? '';
  const rows = publications.map((pub) => [
    escape(pub.title),
    escape(pub.authors),
    pub.year ?? '',
    escape(pub.publication ?? ''),
    escape(pub.doi ?? ''),
    escape(pub.url)
  ]);
  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
}
