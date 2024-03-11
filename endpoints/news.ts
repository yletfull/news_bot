import { DefaultProps, NewsArticle } from '../types';
import { errorHandler } from '../helpers/errorsHandler';

const mockNews: NewsArticle[] = [
  { title: 'Title 1', content: 'Content of the news 1...' },
  { title: 'Title 2', content: 'Content of the news 2...' },
];

interface SendNewsProps extends DefaultProps {
  news: NewsArticle[];
}

const sendNews = async ({ news, openai, bot, chatId }: SendNewsProps) => {
  try {
    const responses = [];

    for (const article of news) {
      try {
        // const response = await openai?.completions?.create({
        //   //@ts-ignore
        //   messages: [
        //     {
        //       role: 'user',
        //       content: `Переделай текст новости, сохраняя смысл: ${article?.content?.[0]}. Пришли результат в json формате, в котором будет поле editedContent: 'измененный текст'`,
        //     },
        //   ],
        //   model: process.env.GPT_MODEL || '',
        // });

        responses.push({
          original: article,
          editedContent: article?.content,
          // original: article,
          // editedContent: response?.choices[0]?.text?.trim() || '',
        });
      } catch (error) {
        errorHandler({ error, bot, chatId, openai });
      }
    }

    for (const response of responses) {
      await bot.sendMessage(
        chatId,
        `Измененный текст новости: ${response.editedContent}`
      );
    }
  } catch (error) {
    console.error('Ошибка в sendNews:', error);
    throw error;
  }
};

export { mockNews, sendNews };
