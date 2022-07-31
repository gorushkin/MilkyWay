import { EntryWithTr, WordWithTr } from '../types';

export const packData = (action: string, value?: string) => {
  return JSON.stringify({ action, ...(value && { value }) });
};

export const unpackData = (queryData: string): { action: string; value: string } => {
  const { action, value } = JSON.parse(queryData);
  return { action, value };
};

export const getFlatArray = <T>(target: Array<T>): Array<T> => {
  const res: Array<T> = [];

  const req = (n: T | Array<T>) => {
    if (!Array.isArray(n)) res.push(n);
    else {
      n.forEach(req);
    }
  };

  req(target);
  return res;
};

type Meaning = { text: string };
type Example = { text: string; translation: string };

const getParsedEntries = (entries: EntryWithTr[]) => {
  return entries.map((entry) => {
    const translations = entry.translation.map((translation) => {
      const text = translation.text;
      const meaning = translation.meaning
        ? (JSON.parse(translation.meaning) as Meaning[]).map((item) => item.text).join(', ')
        : null;
      const example = translation.example
        ? (JSON.parse(translation.example) as Example[])
            .map((item) => `${item.text}: ${item.translation}`)
            .join(', ')
        : null;
      return {
        ...(meaning && { meaning }),
        ...(example && { example }),
        text,
      };
    });

    return { part_of_speech: entry.part_of_speech, translations };
  });
};

export const formateMessage = (word: WordWithTr) => {
  const entries = getParsedEntries(word.entries);

  const result = { text: word.text, entries };

  const messageTitle = `<b>${result.text.toUpperCase()}</b>`;

  const messageBody = result.entries
    .map(
      (entry) =>
        `<b>${entry.part_of_speech}:</b> ${entry.translations.map((item) => item.text).join(', ')}`
    )
    .join('\n');

  return `${messageTitle}\n${messageBody}`;
};
