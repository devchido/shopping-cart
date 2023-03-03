export const checkActiveLink = (pathname: string, link: string) => {
  return pathname.startsWith(link||'');
}