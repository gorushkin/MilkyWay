import TelegramBot from 'node-telegram-bot-api';
import { EntryWithTr, EntireWord } from '../types';

export const packData = (a: string, v: string, i = 'false') => {
  return JSON.stringify({ a, ...(v && { v }), i });
};

export const unpackData = (
  queryData: string
): { action: string; value: string; isRemovable: boolean } => {
  const { a: action, v: value, i: isRemovable } = JSON.parse(queryData);
  return { action, value, isRemovable };
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

export const getFormattedMessage = (word: EntireWord, url: string) => {
  const messageTitle = `<a href="${url}"><b><u>${word.text.toUpperCase()}</u></b></a>`;

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

export const getValueFromMessageBody = (
  entity: TelegramBot.MessageEntity | null
): { text: string; id: string } => {
  if (!entity || entity.type !== 'text_link' || !entity.url) return { text: '', id: '' };
  const string = entity.url.slice(9);
  const decodedMessage = Buffer.from(string, 'base64').toString();
  const [text, id] = decodedMessage.split('/');
  return { text, id };
};

export const getHiddenMessage = (word: string, id: string) => {
  const encodeMessage = Buffer.from(`${word}/${id}`).toString('base64');
  return `<a href="tg://btn/${encodeMessage}">\u200b</a>`;
};
