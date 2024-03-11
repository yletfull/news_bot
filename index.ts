require('dotenv').config();

import { errorHandler } from './helpers/errorsHandler';

import { mockNews, sendNews } from './endpoints/news';
import { start } from './endpoints/start';

import TelegramApi, { Message } from 'node-telegram-bot-api';
import OpenaiApi from 'openai';

const openai = new OpenaiApi({ apiKey: process.env.GPT_TOKEN });
const bot = new TelegramApi(process?.env?.TOKEN || '', { polling: true });

const startBot = async () => {
  bot?.setMyCommands([
    { command: '/start', description: 'Начать взаимодействие' },
    { command: '/send_news', description: 'Отправить примеры новостей' },
  ]);

  bot?.on('message', async (msg: Message) => {
    const text = msg?.text;
    const chatId = msg?.chat?.id;

    const defaultProps = { openai, bot, chatId };

    try {
      if (text === '/start') {
        return start(defaultProps);
      } else if (text === '/send_news') {
        return sendNews({ news: mockNews, ...defaultProps });
      }
    } catch (error) {
      errorHandler({ error, ...defaultProps });
    }
  });
};

// Запуск бота
startBot();
