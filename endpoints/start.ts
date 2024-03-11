import { DefaultProps, NewsArticle } from '../types';

interface StartProps extends DefaultProps {}
const start = async ({ bot, chatId }: StartProps) => {
  return bot.sendMessage(chatId, 'Добро пожаловать!');
};

export { start };
