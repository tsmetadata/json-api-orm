import { put as dynamoDbPut } from '../drivers/dynamodb/put';
import { expectORMConfiguration } from '../utils/expectOrmConfiguration';

export const put = async (classInstance: object) => {
  const { engine } = expectORMConfiguration();

  switch (engine) {
    case 'DYNAMODB':
      dynamoDbPut(classInstance);
      break;
  }

  throw new Error(
    `No \`put\` driver found for database engine \`${engine}\`, please check your JSON:API ORM configuration.`,
  );
};
