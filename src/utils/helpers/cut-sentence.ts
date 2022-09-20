type Props = {
  sentence: string;
  totalWords: number;
};

export const cutSentence = ({ sentence, totalWords }: Props): string => {
  const newSentence = sentence.slice(0, totalWords);
  const dots = sentence.length !== newSentence.length ? "..." : "";

  return `${newSentence}${dots}`;
};
