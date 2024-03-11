import OpenaiApi from 'openai';
import TelegramApi from 'node-telegram-bot-api';

export interface DefaultProps {
  openai: OpenaiApi;
  bot: TelegramApi;
  chatId: number;
}

export interface NewsArticle {
  title: string;
  content: string;
}
