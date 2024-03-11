import { DefaultProps } from '../types';

interface ErrorHandlerProps extends DefaultProps {
  error: Error | any;
}

export const errorHandler = ({ bot, chatId, error }: ErrorHandlerProps) => {
  console.error('Ошибка:', error);
  return bot?.sendMessage(
    chatId,
    'Произошла ошибка при обработке вашего запроса.' + String(error?.message)
  );
};

module.exports = { errorHandler };
