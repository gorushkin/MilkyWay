import { EntryWithTr, EntireWord } from '../types';

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

export const getFormattedMessageBody = (word: EntireWord) => {
  const entries = getParsedEntries(word.entries);

  return entries
    .map(
      (entry) =>
        `<b>${entry.part_of_speech}:</b> ${entry.translations.map((item) => item.text).join(', ')}`
    )
    .join('\n');
};

export const getFormattedMessage = (word: EntireWord) => {
  const messageTitle = `<b>${word.text.toUpperCase()}</b>`;

  const messageBody = getFormattedMessageBody(word);

  return `${messageTitle}\n${messageBody}`;
};

export const getFormattedSettingsMessage = (props: Record<string, string | number | null>) => {
  const filteredUserProperties = Object.entries(props).reduce(
    (acc: { key: string | number | null; value: string | number }[], [key, value]) =>
      value ? [...acc, { key, value }] : acc,
    []
  );

  const formattedSettingsBody = filteredUserProperties
    .filter((item) => !!item.value)
    .map(({ key, value }) => `<b>${key}:</b> ${value}`)
    .join('\n');

  const formattedSettingsTitle = `<b>Current Settings</b>`;

  return `${formattedSettingsTitle}\n${formattedSettingsBody}`;
};
