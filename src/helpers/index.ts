import { WordsOnUsers } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';
import { WholeWord, ITranslation, IExample, IMeaning, ISynonym } from '../types';

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

export const getFormattedMessageBody = (word: WholeWord) =>
  word.entry
    .map(
      (entry) =>
        `<b>${entry.part_of_speech}:</b> ${entry.translation.map((item) => item.text).join(', ')}`
    )
    .join('\n');

export const getFormattedMessage = (
  word: WordsOnUsers & {
    word: WholeWord;
  },
  url: string
) => {
  const messageTitle = `<a href="${url}"><b><u>${word.word.text.toUpperCase()}</u></b></a>`;

  const messageBody = getFormattedMessageBody(word.word);

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

export const getValueFromMessageBody = (entity: TelegramBot.MessageEntity | null): string => {
  if (!entity || entity.type !== 'text_link' || !entity.url) return '';
  const string = entity.url.slice(9);
  return Buffer.from(string, 'base64').toString();
};

export const getHiddenMessage = (word: string) => {
  const encodeMessage = Buffer.from(word).toString('base64');
  return `<a href="tg://btn/${encodeMessage}">\u200b</a>`;
};

export const getData = ({ ex, mean, pos, syn, text }: ITranslation) => {
  const getExamples = (examples: IExample[]) => {
    return examples
      ? examples.map((item) => ({ text: item.text, translation: item.tr[0].text }))
      : null;
  };

  const getSynonyms = (synonyms: ISynonym[]) => {
    return synonyms ? synonyms.map(({ pos, text }) => ({ text, partOfSpeech: pos })) : null;
  };

  const getMeanings = (meanings: IMeaning[]) => {
    return meanings ? meanings.map(({ text }) => ({ text })) : null;
  };

  const examples = getExamples(ex);
  const synonyms = getSynonyms(syn);
  const meanings = getMeanings(mean);

  return {
    ...(examples && { example: JSON.stringify(examples) }),
    ...(meanings && { meaning: JSON.stringify(meanings) }),
    ...(synonyms && { synonym: JSON.stringify(synonyms) }),
    part_of_speech: pos,
    text,
  };
};


export const getMessage = () => {

}
