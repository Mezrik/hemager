export const spaceOnCapitalLetter = (str: string) => {
  const splitted = str.match(/[A-Z][a-z]+/g);
  return splitted?.join(' ') ?? str;
};
